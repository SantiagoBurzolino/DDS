import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { RELATOS_HISTORICOS } from "../constant/relato";

export function usarReproductorDeRelato(estaGritando: boolean) {
  const [relatoSeleccionado, setRelatoSeleccionado] = useState(
    RELATOS_HISTORICOS[Math.floor(Math.random() * RELATOS_HISTORICOS.length)],
  );

  const reproductor = useAudioPlayer(relatoSeleccionado.archivo);

  useEffect(() => {
    if (estaGritando) {
      reproductor.play();
    } else {
      reproductor.pause();

      const nuevoIndice = Math.floor(Math.random() * RELATOS_HISTORICOS.length);
      setRelatoSeleccionado(RELATOS_HISTORICOS[nuevoIndice]);
    }
  }, [estaGritando, reproductor]);

  return { relatoSeleccionado };
}
