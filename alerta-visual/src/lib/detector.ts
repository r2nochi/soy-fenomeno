import * as tf from "@tensorflow/tfjs";
import { SONIDOS, type IdSonido } from "./sonidos";

// YAMNet espera audio mono a 16 kHz y analiza ventanas de 0,975 s.
// El worklet convierte a 16 kHz si el navegador no acepta esa frecuencia.
const VENTANA = 15600;
// Tiempo mínimo entre dos avisos del mismo sonido.
const ESPERA_MS = 15000;
// Si no llega audio en este tiempo, el micrófono dejó de funcionar.
const SIN_AUDIO_MS = 4000;
const FALLOS_MAXIMOS = 3;

export type Deteccion = { id: IdSonido; confianza: number; hora: Date };

type Opciones = {
  activos: () => Set<IdSonido>;
  alDetectar: (d: Deteccion) => void;
  // Volumen de 0 a 1, para mostrar que el micrófono está escuchando.
  alNivel: (nivel: number) => void;
  // La escucha se detuvo sola: la interfaz debe avisarlo.
  alFallo: (motivo: string) => void;
};

let modelo: tf.GraphModel | null = null;

async function cargarModelo() {
  if (!modelo) {
    await tf.ready();
    modelo = await tf.loadGraphModel("/yamnet/model.json");
    // La primera predicción tarda segundos (compila la GPU); se hace ahora
    // para que el primer sonido real se analice al instante.
    const red = modelo;
    tf.tidy(() => {
      (red.predict(tf.zeros([VENTANA])) as tf.Tensor[]).forEach((t) =>
        t.dataSync(),
      );
    });
  }
  return modelo;
}

function crearContexto() {
  try {
    return new AudioContext({ sampleRate: 16000 });
  } catch {
    return new AudioContext();
  }
}

export async function iniciarDetector({
  activos,
  alDetectar,
  alNivel,
  alFallo,
}: Opciones) {
  // El contexto se crea antes de esperar al modelo: así aprovecha el clic
  // del usuario y el navegador no lo deja suspendido.
  let contexto = crearContexto();
  let stream: MediaStream | null = null;
  let fuente: MediaStreamAudioSourceNode;
  let captura: AudioWorkletNode;
  let silencio: GainNode;

  try {
    const red = await cargarModelo();
    stream = await navigator.mediaDevices.getUserMedia({
      // Sin estos filtros: la supresión de ruido borra alarmas y timbres.
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });

    await contexto.audioWorklet.addModule("/captura-worklet.js");
    try {
      fuente = contexto.createMediaStreamSource(stream);
    } catch {
      // Firefox no acepta un contexto a otra frecuencia que el micrófono.
      await contexto.close();
      contexto = new AudioContext();
      await contexto.audioWorklet.addModule("/captura-worklet.js");
      fuente = contexto.createMediaStreamSource(stream);
    }
    captura = new AudioWorkletNode(contexto, "captura");
    // Conectado a la salida con volumen 0: algunos navegadores no procesan
    // nodos que no llegan a la salida.
    silencio = contexto.createGain();
    silencio.gain.value = 0;
    fuente.connect(captura);
    captura.connect(silencio);
    silencio.connect(contexto.destination);
    await contexto.resume();

    return escuchar(red);
  } catch (e) {
    stream?.getTracks().forEach((t) => t.stop());
    void contexto.close();
    throw e;
  }

  function escuchar(red: tf.GraphModel) {
    const buffer = new Float32Array(VENTANA);
    const seguidas = new Map<IdSonido, number>();
    const ultimoAviso = new Map<IdSonido, number>();
    let ocupado = false;
    let activo = true;
    let fallos = 0;
    let ultimoBloque = Date.now();

    function fallar(motivo: string) {
      if (!activo) return;
      detener();
      alFallo(motivo);
    }

    captura.port.onmessage = ({ data }: MessageEvent<Float32Array>) => {
      if (!activo) return;
      ultimoBloque = Date.now();
      // Desliza la ventana: conserva el final y agrega el bloque nuevo.
      buffer.copyWithin(0, data.length);
      buffer.set(data, VENTANA - data.length);

      let pico = 0;
      for (const v of data) pico = Math.max(pico, Math.abs(v));
      alNivel(Math.min(1, pico * 3));

      if (ocupado) return; // Si el equipo es lento, salta esta ventana.
      ocupado = true;
      try {
        // dataSync y no data(): data() espera a la GPU con temporizadores, que
        // el navegador frena en pestañas ocultas. Son solo 521 números.
        const valores = tf.tidy(() => {
          const salida = red.predict(tf.tensor1d(buffer)) as tf.Tensor[];
          return salida[0].max(0).dataSync();
        });
        fallos = 0;
        evaluar(valores);
      } catch (e) {
        console.error("Error al analizar el audio:", e);
        if (++fallos >= FALLOS_MAXIMOS) {
          fallar("El análisis del sonido dejó de funcionar.");
        }
      } finally {
        ocupado = false;
      }
    };

    function evaluar(valores: ArrayLike<number>) {
      if (!activo) return;
      const ahora = Date.now();
      const habilitados = activos();
      for (const sonido of SONIDOS) {
        if (!habilitados.has(sonido.id)) continue;
        const confianza = Math.max(...sonido.clases.map((c) => valores[c]));
        if (confianza < sonido.umbral) {
          seguidas.set(sonido.id, 0);
          continue;
        }
        const n = (seguidas.get(sonido.id) ?? 0) + 1;
        seguidas.set(sonido.id, n);
        const reciente = ahora - (ultimoAviso.get(sonido.id) ?? 0) < ESPERA_MS;
        if (n >= sonido.confirmaciones && !reciente) {
          ultimoAviso.set(sonido.id, ahora);
          alDetectar({ id: sonido.id, confianza, hora: new Date() });
        }
      }
    }

    // El micrófono se desconectó, otra app lo tomó o se quitó el permiso.
    for (const pista of stream!.getAudioTracks()) {
      pista.onended = () => fallar("Se desconectó el micrófono.");
    }
    // iOS suspende el audio tras una llamada o al bloquear la pantalla.
    contexto.onstatechange = () => {
      if (activo && contexto.state !== "running") {
        contexto.resume().catch(() => fallar("El audio quedó en pausa."));
      }
    };
    const vigilante = setInterval(() => {
      if (Date.now() - ultimoBloque > SIN_AUDIO_MS) {
        contexto.resume().catch(() => {});
        if (Date.now() - ultimoBloque > SIN_AUDIO_MS * 2) {
          fallar("No está llegando sonido del micrófono.");
        }
      }
    }, SIN_AUDIO_MS);

    function detener() {
      if (!activo) return;
      activo = false;
      clearInterval(vigilante);
      captura.port.onmessage = null;
      contexto.onstatechange = null;
      fuente.disconnect();
      captura.disconnect();
      silencio.disconnect();
      stream!.getTracks().forEach((t) => {
        t.onended = null;
        t.stop();
      });
      void contexto.close();
    }

    return detener;
  }
}
