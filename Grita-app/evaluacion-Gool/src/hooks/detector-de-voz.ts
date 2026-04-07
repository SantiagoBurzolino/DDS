import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { MEDIDAS } from "../constant/tema";

export function usarDetectorDeVoz() {
  const [estaGritando, setEstaGritando] = useState(false);
  const [decibeles, setDecibeles] = useState(-160);
  const [sistemaListo, setSistemaListo] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const grabadoraRef = useRef<Audio.Recording | null>(null);

  const activarMicrofono = async () => {
    if (grabadoraRef.current) return;
    setMensajeError("");

    try {
      const estadoPermisos = await Audio.requestPermissionsAsync();

      if (!estadoPermisos.granted) {
        setMensajeError(
          "Permiso de micrófono denegado. Habilitalo en los ajustes de tu celular.",
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const nuevaGrabadora = new Audio.Recording();
      grabadoraRef.current = nuevaGrabadora;

      await nuevaGrabadora.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      nuevaGrabadora.setProgressUpdateInterval(
        MEDIDAS.intervaloActualizacionMs,
      );

      nuevaGrabadora.setOnRecordingStatusUpdate((estado) => {
        const volumenActual = estado.metering ?? -160;
        setDecibeles(volumenActual);
        setEstaGritando(volumenActual > MEDIDAS.umbralVolumenDeteccion);
      });

      await nuevaGrabadora.startAsync();
      setSistemaListo(true);
    } catch (error: any) {
      console.error(error);
      setMensajeError(
        "Error técnico: " + (error.message || "Fallo al iniciar el hardware."),
      );
      grabadoraRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (grabadoraRef.current) {
        grabadoraRef.current.stopAndUnloadAsync().catch(() => {});
      }
    };
  }, []);

  return {
    estaGritando,
    decibeles,
    sistemaListo,
    activarMicrofono,
    mensajeError,
  };
}
