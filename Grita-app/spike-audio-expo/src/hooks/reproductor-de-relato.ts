import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { RELATOS_HISTORICOS } from "../constant/relato";
import { setReproductorReproduciendo } from "./estado-reproductor";

export function usarReproductorDeRelato(estaGritando: boolean) {
  const [relatoSeleccionado, setRelatoSeleccionado] = useState(
    RELATOS_HISTORICOS[Math.floor(Math.random() * RELATOS_HISTORICOS.length)],
  );

  const reproductor = useAudioPlayer(relatoSeleccionado.archivo);

  useEffect(() => {
    if (estaGritando) {
      console.log('[REPRODUCTOR] Iniciando reproducción del relato:', relatoSeleccionado.archivo);
      setReproductorReproduciendo(true);
      reproductor.play();
    } else {
      reproductor.pause();
      console.log('[REPRODUCTOR] Pausa/fin de reproducción');
      setReproductorReproduciendo(false);

      const nuevoIndice = Math.floor(Math.random() * RELATOS_HISTORICOS.length);
      setRelatoSeleccionado(RELATOS_HISTORICOS[nuevoIndice]);
    }
  }, [estaGritando, reproductor]);

  return { relatoSeleccionado };
}
