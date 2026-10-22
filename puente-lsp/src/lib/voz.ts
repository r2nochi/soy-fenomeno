// Transcripción de voz con la Web Speech API de Chrome / Edge.
// El navegador envía la voz a los servidores de Google o Microsoft para transcribirla.

type Resultado = { 0: { transcript: string }; isFinal: boolean };
type EventoResultado = {
  resultIndex: number;
  results: ArrayLike<Resultado>;
};
type Reconocedor = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: EventoResultado) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type Ventana = typeof window & {
  SpeechRecognition?: new () => Reconocedor;
  webkitSpeechRecognition?: new () => Reconocedor;
};

export function vozDisponible() {
  const w = window as Ventana;
  return Boolean(w.SpeechRecognition ?? w.webkitSpeechRecognition);
}

type Opciones = {
  idiomas: string[];
  alParcial: (texto: string) => void;
  alFinal: (texto: string) => void;
  alError: (mensaje: string) => void;
  // Se llama cuando la transcripción se apaga sola para siempre (error fatal o
  // micrófono no disponible). Se llama de forma asíncrona, desde un evento del reconocedor.
  alDetenido?: () => void;
  // Frase que se agrega al final de los mensajes de error de red o micrófono.
  // Por defecto mantiene el texto de Alerta Visual; "" deja el mensaje sin frase.
  complemento?: string;
};

const COMPLEMENTO_ALERTA = "Los avisos de sonido siguen funcionando.";
const ESPERA_INICIAL_MS = 300;
const ESPERA_MAXIMA_MS = 30000;
// Errores que no se arreglan reintentando sin parar.
const ERRORES_FATALES = new Set(["not-allowed", "service-not-allowed"]);
const INTENTOS_SIN_MIC = 5;

export function iniciarVoz({
  idiomas,
  alParcial,
  alFinal,
  alError,
  alDetenido,
  complemento = COMPLEMENTO_ALERTA,
}: Opciones) {
  const conComplemento = (texto: string) => (complemento ? `${texto} ${complemento}` : texto);
  const w = window as Ventana;
  const Clase = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  const nada = { detener() {}, pausar() {}, reanudar() {} };
  if (!Clase) {
    alError("Este navegador no puede transcribir voz. Usa Chrome o Edge.");
    return nada;
  }

  let activo = true;
  let pausado = false;
  // Solo hay un reconocedor vivo a la vez: los eventos de uno viejo se ignoran.
  let actual: Reconocedor | null = null;
  let temporizador: ReturnType<typeof setTimeout> | undefined;
  let espera = ESPERA_INICIAL_MS;
  let idioma = 0;
  let sinMic = 0;

  function soltar(r: Reconocedor | null, modo: "stop" | "abort") {
    if (!r) return;
    r.onresult = r.onerror = r.onend = null;
    try {
      r[modo]();
    } catch {}
  }

  function programar() {
    clearTimeout(temporizador);
    if (!activo || pausado) return;
    temporizador = setTimeout(arrancar, espera);
    // Si sigue fallando, espera cada vez más (hasta 30 s).
    espera = Math.min(ESPERA_MAXIMA_MS, espera * 2);
  }

  function arrancar() {
    if (!activo || pausado || actual) return;
    const r = new Clase!();
    r.lang = idiomas[idioma];
    r.continuous = true;
    r.interimResults = true;

    r.onresult = (e) => {
      if (r !== actual) return;
      espera = ESPERA_INICIAL_MS;
      sinMic = 0;
      let parcial = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const texto = res[0].transcript.trim();
        if (!texto) continue;
        if (res.isFinal) alFinal(texto);
        else parcial += `${texto} `;
      }
      alParcial(parcial.trim());
    };

    r.onerror = (e) => {
      if (r !== actual) return;
      if (ERRORES_FATALES.has(e.error)) {
        activo = false;
        alError("No hay permiso para usar el micrófono en la transcripción.");
        alDetenido?.();
      } else if (e.error === "language-not-supported" && idioma < idiomas.length - 1) {
        idioma++;
        espera = ESPERA_INICIAL_MS;
      } else if (e.error === "network") {
        alError(conComplemento("Sin internet: la transcripción de voz necesita conexión."));
      } else if (e.error === "audio-capture" && ++sinMic >= INTENTOS_SIN_MIC) {
        activo = false;
        alError(conComplemento("La transcripción no puede usar el micrófono."));
        alDetenido?.();
      }
      // "no-speech" y "aborted" son normales: se reinicia en onend.
    };

    // Chrome corta la transcripción tras un silencio o cerca de un minuto:
    // se vuelve a iniciar mientras siga activa.
    r.onend = () => {
      if (r !== actual) return;
      actual = null;
      alParcial("");
      programar();
    };

    actual = r;
    try {
      r.start();
    } catch (e) {
      console.error(e);
      actual = null;
      alError("No se pudo iniciar la transcripción. Lo intentamos de nuevo…");
      programar();
    }
  }

  arrancar();

  return {
    detener() {
      activo = false;
      clearTimeout(temporizador);
      soltar(actual, "abort");
      actual = null;
    },
    // Mientras el equipo habla en voz alta, no se transcribe a sí mismo.
    // stop() (no abort) entrega como final lo que la otra persona estaba diciendo.
    pausar() {
      if (pausado) return;
      pausado = true;
      clearTimeout(temporizador);
      const r = actual;
      actual = null;
      if (r) {
        r.onend = () => alParcial("");
        r.onerror = null;
        try {
          r.stop();
        } catch {}
      }
    },
    reanudar() {
      if (!pausado) return;
      pausado = false;
      espera = ESPERA_INICIAL_MS;
      arrancar();
    },
  };
}
