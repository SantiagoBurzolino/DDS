import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState
} from "expo-audio";
import { useEffect, useRef, useState } from "react";
import { MEDIDAS } from "../constant/tema";
import { esReproductorReproduciendo } from "./estado-reproductor";

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

  const temporizadorSostenimientoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ultimoMeterRef = useRef(-160);
  const UMBRAL_DELTA_DB = MEDIDAS.umbralDeltaDb;
  const ultimaDeteccionTimestampRef = useRef<number | null>(null);
  const framesArribaRef = useRef(0);
  const FRAMES_PARA_DISPARO = MEDIDAS.framesConsecutivosParaDisparo;

  useEffect(() => {
    let intervaloMonitoreo: ReturnType<typeof setInterval>;

    if (sistemaListo) {
      intervaloMonitoreo = setInterval(() => {
        const volumenActual = estadoGrabadora.metering ?? -160;
        console.log('[SPIKE MIC] metering:', volumenActual);
        setDecibeles(volumenActual);

        
        if (esReproductorReproduciendo()) {
          ultimoMeterRef.current = volumenActual;
          console.log('[DETECTOR] Ignorado porque el reproductor está reproduciendo — metering:', volumenActual);
          return;
        }

        const now = Date.now();
        const prev = ultimoMeterRef.current;
        const delta = volumenActual - prev;
        ultimoMeterRef.current = volumenActual;

        const estaPorEncender = volumenActual > MEDIDAS.umbralVolumenEntrada && delta > UMBRAL_DELTA_DB;
        const estaPorMantener = volumenActual > MEDIDAS.umbralVolumenSalida;

        if (!estaGritando) {
          if (estaPorEncender) {
            framesArribaRef.current += 1;
          } else {
            framesArribaRef.current = 0;
          }

          if (framesArribaRef.current >= FRAMES_PARA_DISPARO) {
            console.log('[DETECTOR] Activando grito — metering:', volumenActual, 'delta:', delta, 'frames:', framesArribaRef.current);
            setEstaGritando(true);
            ultimaDeteccionTimestampRef.current = now;
            framesArribaRef.current = 0;
          }
        } else {
          if (estaPorMantener) {
            ultimaDeteccionTimestampRef.current = now;
          }
        }

        if (
          ultimaDeteccionTimestampRef.current &&
          now - ultimaDeteccionTimestampRef.current > MEDIDAS.duracionSostenimientoMs
        ) {
          console.log('[DETECTOR] Apagando grito — metering:', volumenActual);
          setEstaGritando(false);
          ultimaDeteccionTimestampRef.current = null;
          framesArribaRef.current = 0;
        }
      }, MEDIDAS.intervaloActualizacionMs);
    }

    return () => {
      if (intervaloMonitoreo) clearInterval(intervaloMonitoreo);
    };
  }, [sistemaListo, estadoGrabadora.metering]);

  useEffect(() => {
    return () => {
      if (temporizadorSostenimientoRef.current) {
        clearTimeout(temporizadorSostenimientoRef.current);
      }
    };
  }, []);

  const activarMicrofono = async () => {
    setMensajeError("");

    try {
      const estadoPermisos =
        await AudioModule.requestRecordingPermissionsAsync();
        console.log("Estado de permisos:", estadoPermisos);

      if (!estadoPermisos.granted) {
        setMensajeError("Permiso de micrófono denegado.");
        return;
      }

      await grabadora.prepareToRecordAsync();
      grabadora.record();
      console.log('[SPIKE MIC] recording started');
      setSistemaListo(true);
    } catch (error: any) {
      setMensajeError("Error técnico: Fallo al iniciar el hardware.");
    }
  };

  const forzarApagarGrito = () => {
    setEstaGritando(false);
    ultimaDeteccionTimestampRef.current = null;
    framesArribaRef.current = 0;
  };

  return {
    estaGritando,
    decibeles,
    sistemaListo,
    activarMicrofono,
    mensajeError,
    forzarApagarGrito,
  };
}
