import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { COLORES, MEDIDAS } from "../../constants/colors";

type Props = {
  valor: string;
  alCambiarTexto: (texto: string) => void;
  alEnviar: () => void;
};

export function FormularioParaNuevoProducto({
  valor,
  alCambiarTexto,
  alEnviar,
}: Props) {
  return (
    <View style={estilos.filaDeEntradaDatos}>
      <TextInput
        value={valor}
        onChangeText={alCambiarTexto}
        placeholder="Agregar producto (ej: Leche)"
        style={estilos.cajaDeTexto}
        returnKeyType="done"
        onSubmitEditing={alEnviar}
      />
      <Pressable style={estilos.botonAgregar} onPress={alEnviar}>
        <Text style={estilos.textoBotonAgregar}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  filaDeEntradaDatos: {
    flexDirection: "row",
    gap: MEDIDAS.espaciado.pequeno,
  },
  cajaDeTexto: {
    flex: 1,
    borderWidth: MEDIDAS.grosorLinea,
    borderColor: COLORES.borde,
    borderRadius: MEDIDAS.radios.estandar,
    paddingHorizontal: MEDIDAS.espaciado.mediano,
    height: MEDIDAS.alturaCajaTexto,
  },
  botonAgregar: {
    backgroundColor: COLORES.botonPrimario,
    paddingHorizontal: MEDIDAS.radios.redondeado,
    borderRadius: MEDIDAS.radios.estandar,
    justifyContent: "center",
  },
  textoBotonAgregar: {
    color: COLORES.textoBlanco,
    fontWeight: "600",
  },
});
