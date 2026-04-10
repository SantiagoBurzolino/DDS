import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { RELATOS_HISTORICOS } from "../constant/relato";
import { setReproductorReproduciendo } from "./estado-reproductor";

export function usarReproductorDeRelato(estaGritando: boolean, onPlaybackEnd?: () => void) {
  const [relatoSeleccionado, setRelatoSeleccionado] = useState(
    RELATOS_HISTORICOS[Math.floor(Math.random() * RELATOS_HISTORICOS.length)],
  );

  const reproductor = useAudioPlayer(relatoSeleccionado.archivo);
  const playbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Limpiar timeout anterior
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }

    if (estaGritando) {
      console.log('[REPRODUCTOR] Iniciando reproducción del relato:', relatoSeleccionado.archivo);
      setReproductorReproduciendo(true);
      reproductor.play();

      // Watchdog: si la reproducción no notifica fin, forzamos terminar después de X ms
      playbackTimeoutRef.current = setTimeout(() => {
        try {
          reproductor.pause();
        } catch (e) {
          /* ignore */
        }
        setReproductorReproduciendo(false);
        if (onPlaybackEnd) onPlaybackEnd();
      }, MEDIDAS.playbackTimeoutMs ?? 30000);
    } else {
      try {
        reproductor.pause();
      } catch (e) {
        /* ignore */
      }
      console.log('[REPRODUCTOR] Pausa/fin de reproducción');
      setReproductorReproduciendo(false);

      const nuevoIndice = Math.floor(Math.random() * RELATOS_HISTORICOS.length);
      setRelatoSeleccionado(RELATOS_HISTORICOS[nuevoIndice]);
      if (onPlaybackEnd) onPlaybackEnd();
    }

    return () => {
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
      }
    };
  }, [estaGritando, reproductor, relatoSeleccionado, onPlaybackEnd]);

  return { relatoSeleccionado };
}
