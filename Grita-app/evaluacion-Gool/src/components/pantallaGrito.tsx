import React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { usarDetectorDeVoz } from "../hooks/detector-de-voz";
import { usarReproductorDeRelato } from "../hooks/reproductor-de-relato";
import { estilos } from "./pantallaGrito-estilo";

export default function PantallaGrito() {
  const {
    estaGritando,
    decibeles,
    sistemaListo,
    activarMicrofono,
    mensajeError,
  } = usarDetectorDeVoz();

  const { relatoSeleccionado } = usarReproductorDeRelato(estaGritando);

  if (!sistemaListo) {
    return (
      <View style={estilos.contenedorPrincipal}>
        <StatusBar barStyle="light-content" />
        <Text style={estilos.tituloPrincipal}>EL GRITO SAGRADO</Text>

        <Pressable style={estilos.botonInicio} onPress={activarMicrofono}>
          <Text style={estilos.textoBoton}>TOCAR PARA INICIAR</Text>
        </Pressable>

        {mensajeError ? (
          <Text style={estilos.textoError}>{mensajeError}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={estilos.contenedorPrincipal}>
      <StatusBar barStyle="light-content" />

      <Text style={estilos.textoDepuracion}>dB: {Math.round(decibeles)}</Text>

      {!estaGritando ? (
        <View style={estilos.capaInformativa}>
          <Text style={estilos.tituloPrincipal}>EL GRITO SAGRADO</Text>
          <Text style={estilos.instrucciones}>
            Gritá por el gol para revelar la historia
          </Text>
        </View>
      ) : (
        <View style={estilos.capaLiteratura}>
          <Text style={estilos.textoRelato}>{relatoSeleccionado.texto}</Text>
        </View>
      )}
    </View>
  );
}
