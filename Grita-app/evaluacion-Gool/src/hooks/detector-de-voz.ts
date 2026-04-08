import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState
} from "expo-audio";
import { useEffect, useRef, useState } from "react";
import { MEDIDAS } from "../constant/tema";

export function usarDetectorDeVoz() {
  const grabadora = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });
  const estadoGrabadora = useAudioRecorderState(grabadora);

  const [estaGritando, setEstaGritando] = useState(false);
  const [decibeles, setDecibeles] = useState(-160);
  const [sistemaListo, setSistemaListo] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const temporizadorSostenRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    let intervaloMonitoreo: ReturnType<typeof setInterval>;

    if (sistemaListo) {
      intervaloMonitoreo = setInterval(() => {
        const volumenActual = estadoGrabadora.metering ?? -160;
        setDecibeles(volumenActual);

        if (volumenActual > MEDIDAS.umbralVolumenDeteccion) {
          setEstaGritando(true);

          if (temporizadorSostenRef.current) {
            clearTimeout(temporizadorSostenRef.current);
          }

          temporizadorSostenRef.current = setTimeout(() => {
            setEstaGritando(false);
          }, 2000);
        }
      }, 100);
    }

    return () => {
      if (intervaloMonitoreo) clearInterval(intervaloMonitoreo);
    };
  }, [sistemaListo, estadoGrabadora.metering]);

  useEffect(() => {
    return () => {
      if (temporizadorSostenRef.current) {
        clearTimeout(temporizadorSostenRef.current);
      }
    };
  }, []);

  const activarMicrofono = async () => {
    setMensajeError("");

    try {
      const estadoPermisos =
        await AudioModule.requestRecordingPermissionsAsync();

      if (!estadoPermisos.granted) {
        setMensajeError("Permiso de micrófono denegado.");
        return;
      }

      await grabadora.prepareToRecordAsync();
      grabadora.record();
      setSistemaListo(true);
    } catch (error: any) {
      setMensajeError("Error técnico: Fallo al iniciar el hardware.");
    }
  };

  return {
    estaGritando,
    decibeles,
    sistemaListo,
    activarMicrofono,
    mensajeError,
  };
}
