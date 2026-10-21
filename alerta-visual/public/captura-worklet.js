// Convierte el audio del micrófono a 16 kHz y lo envía en bloques de
// 8000 muestras (0,5 s). Los mensajes del worklet siguen llegando aunque la
// pestaña esté en segundo plano, a diferencia de setInterval.
const DESTINO = 16000;

class Captura extends AudioWorkletProcessor {
  constructor() {
    super();
    // sampleRate es la frecuencia real del contexto (global del worklet).
    this.paso = sampleRate / DESTINO;
    this.bloque = new Float32Array(8000);
    this.pos = 0;
    // Promedio de las muestras que caen en cada muestra de salida:
    // filtro pasa-bajos simple que evita el aliasing al reducir la frecuencia.
    this.suma = 0;
    this.cuenta = 0;
    this.acumulado = 0;
  }

  process(inputs) {
    const canal = inputs[0] && inputs[0][0];
    if (!canal) return true;
    for (let i = 0; i < canal.length; i++) {
      this.suma += canal[i];
      this.cuenta++;
      this.acumulado++;
      if (this.acumulado >= this.paso) {
        this.acumulado -= this.paso;
        this.bloque[this.pos++] = this.suma / this.cuenta;
        this.suma = 0;
        this.cuenta = 0;
        if (this.pos === this.bloque.length) {
          this.port.postMessage(this.bloque.slice());
          this.pos = 0;
        }
      }
    }
    return true;
  }
}

registerProcessor("captura", Captura);
