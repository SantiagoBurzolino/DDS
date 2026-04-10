export const COLORES = {
  fondoPantalla: "#000000",
  textoPrincipal: "#ffffff",
  textoAcento: "#fbbf24",
};

export const MEDIDAS = {
  // Valores de diagnóstico: se pueden ajustar durante pruebas
  umbralVolumenEntrada: -55, // dB para iniciar detección (menos estricto para pruebas)
  umbralVolumenSalida: -65, // dB para detener detección
  umbralDeltaDb: 12, // dB mínimo de subida entre frames
  duracionSostenimientoMs: 1200,
  intervaloActualizacionMs: 100,
  framesConsecutivosParaDisparo: 1, // probar con 1 frame para diagnóstico
  tamanoTitulo: 32,
  tamanoTextoRelato: 24,
  espaciadoGeneral: 30,
};
