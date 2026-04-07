import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { RELATOS_HISTORICOS } from "../constant/relato";

export function usarReproductorDeRelato(estaGritando: boolean) {
  const [sonidoActivo, setSonidoActivo] = useState<Audio.Sound | null>(null);
  const [relatoSeleccionado, setRelatoSeleccionado] = useState(
    RELATOS_HISTORICOS[0],
  );

  useEffect(() => {
    async function controlarAudio() {
      try {
        if (estaGritando) {
          if (!sonidoActivo) {
            const seleccionAleatoria =
              RELATOS_HISTORICOS[
                Math.floor(Math.random() * RELATOS_HISTORICOS.length)
              ];
            setRelatoSeleccionado(seleccionAleatoria);

            const { sound } = await Audio.Sound.createAsync(
              seleccionAleatoria.archivo,
            );
            setSonidoActivo(sound);
            await sound.playAsync();
          } else {
            await sonidoActivo.playAsync();
          }
        } else {
          await sonidoActivo?.pauseAsync();
        }
      } catch (error) {
        console.error(error);
      }
    }
    controlarAudio();
  }, [estaGritando]);

  return { relatoSeleccionado };
}
