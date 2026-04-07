import React from "react";
import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import { COLORES, MEDIDAS } from "../constant/tema";
import { usarDetectorDeVoz } from "../hooks/detector-de-voz";
import { usarReproductorDeRelato } from "../hooks/reproductor-de-relato";

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

      <Text style={estilos.textoDepuracion}>
        Volumen actual: {Math.round(decibeles)} dB
      </Text>

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

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: COLORES.fondoPantalla,
    justifyContent: "center",
    alignItems: "center",
    padding: MEDIDAS.espaciadoGeneral,
  },
  botonInicio: {
    backgroundColor: COLORES.textoAcento,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBoton: {
    color: COLORES.fondoPantalla,
    fontWeight: "bold",
    fontSize: 16,
  },
  textoError: {
    color: "#ef4444",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  textoDepuracion: {
    position: "absolute",
    top: 50,
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "bold",
  },
  capaInformativa: { alignItems: "center" },
  capaLiteratura: { flex: 1, justifyContent: "center" },
  tituloPrincipal: {
    color: COLORES.textoPrincipal,
    fontSize: MEDIDAS.tamanoTitulo,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  instrucciones: {
    color: COLORES.textoPrincipal,
    opacity: 0.6,
    textAlign: "center",
  },
  textoRelato: {
    color: COLORES.textoAcento,
    fontSize: MEDIDAS.tamanoTextoRelato,
    textAlign: "center",
    fontStyle: "italic",
  },
});
