import { StyleSheet } from "react-native";
import { COLORES, MEDIDAS } from "../constant/tema";

export const estilos = StyleSheet.create({
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
