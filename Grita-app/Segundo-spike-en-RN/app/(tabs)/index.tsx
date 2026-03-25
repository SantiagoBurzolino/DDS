import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Producto = {
  id: string;
  nombre: string;
  estaComprado: boolean;
};

const ICONO_COMPRADO = "✔";
const ICONO_PENDIENTE = "•";

const COLOR_FONDO_PRINCIPAL = "#fff";
const COLOR_FONDO_PENDIENTE = "#eee";
const COLOR_FONDO_EXITO = "#2ecc71";
const COLOR_BOTON_PRIMARIO = "#1e90ff";
const COLOR_BORDE = "#ddd";
const COLOR_SEPARADOR = "#eee";
const COLOR_TEXTO_BLANCO = "#fff";
const COLOR_TEXTO_SECUNDARIO = "#666";
const COLOR_TEXTO_VACIO = "#777";
const COLOR_TEXTO_TACHADO = "#999";

const ESPACIADO_PEQUENO = 8;
const ESPACIADO_MEDIANO = 12;
const ESPACIADO_GRANDE = 16;
const ESPACIADO_EXTRA_GRANDE = 24;
const ESPACIADO_RELLENO_LISTA = 32;

const TAMANO_FUENTE_NORMAL = 16;
const TAMANO_FUENTE_TITULO = 24;
const GROSOR_FUENTE_SEMI_NEGRITA = "600";
const GROSOR_FUENTE_NEGRITA = "bold";
const GROSOR_FUENTE_EXTRA_NEGRITA = "700";

const RADIO_BORDE_ESTANDAR = 8;
const RADIO_BORDE_REDONDEADO = 14;
const TAMANO_PILDORA = 28;
const ALTURA_CAJA_TEXTO = 44;
const GROSOR_LINEA = 1;

export default function PantallaListaDeCompras() {
  const [listaDeProductos, setListaDeProductos] = useState<Producto[]>([]);
  const [nombreNuevoProducto, setNombreNuevoProducto] = useState("");

  const agregarProductoALaLista = () => {
    const nombreProductoLimpio = nombreNuevoProducto.trim();

    if (!nombreProductoLimpio) return;

    setListaDeProductos((productosAnteriores) => [
      ...productosAnteriores,
      {
        id: String(Date.now()),
        nombre: nombreProductoLimpio,
        estaComprado: false,
      },
    ]);

    setNombreNuevoProducto("");
  };

  const alternarEstadoDeCompraDelProducto = (idDelProducto: string) => {
    setListaDeProductos((productosAnteriores) =>
      productosAnteriores.map((producto) =>
        producto.id === idDelProducto
          ? { ...producto, estaComprado: !producto.estaComprado }
          : producto,
      ),
    );
  };

  const eliminarProductoDeLaLista = (idDelProducto: string) => {
    setListaDeProductos((productosAnteriores) =>
      productosAnteriores.filter((producto) => producto.id !== idDelProducto),
    );
  };

  const renderizarFilaDeProducto = ({ item: producto }: { item: Producto }) => (
    <Pressable
      onPress={() => alternarEstadoDeCompraDelProducto(producto.id)}
      onLongPress={() => eliminarProductoDeLaLista(producto.id)}
      style={estilos.fila}
    >
      <Text
        style={[
          estilos.textoFila,
          producto.estaComprado && estilos.textoTachado,
        ]}
      >
        {producto.nombre}
      </Text>
      <Text
        style={[
          estilos.pildora,
          producto.estaComprado
            ? estilos.pildoraComprada
            : estilos.pildoraPendiente,
        ]}
      >
        {producto.estaComprado ? ICONO_COMPRADO : ICONO_PENDIENTE}
      </Text>
    </Pressable>
  );

  return (
    <View style={estilos.contenedorPrincipal}>
      <Text style={estilos.titulo}>🛒 Lista de Compras</Text>

      <View style={estilos.filaDeEntradaDatos}>
        <TextInput
          value={nombreNuevoProducto}
          onChangeText={setNombreNuevoProducto}
          placeholder="Agregar producto (ej: Leche)"
          style={estilos.cajaDeTexto}
          returnKeyType="done"
          onSubmitEditing={agregarProductoALaLista}
        />
        <Pressable
          style={estilos.botonAgregar}
          onPress={agregarProductoALaLista}
        >
          <Text style={estilos.textoBotonAgregar}>Agregar</Text>
        </Pressable>
      </View>

      <FlatList
        data={listaDeProductos}
        keyExtractor={(producto) => producto.id}
        renderItem={renderizarFilaDeProducto}
        ListEmptyComponent={
          <Text style={estilos.textoListaVacia}>
            Sin productos. ¡Agregá el primero! 😊
          </Text>
        }
        ItemSeparatorComponent={() => <View style={estilos.separador} />}
        contentContainerStyle={estilos.rellenoLista}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    padding: ESPACIADO_GRANDE,
    gap: ESPACIADO_MEDIANO,
    backgroundColor: COLOR_FONDO_PRINCIPAL,
  },
  titulo: {
    fontSize: TAMANO_FUENTE_TITULO,
    fontWeight: GROSOR_FUENTE_NEGRITA,
    marginTop: ESPACIADO_MEDIANO,
  },
  filaDeEntradaDatos: {
    flexDirection: "row",
    gap: ESPACIADO_PEQUENO,
  },
  cajaDeTexto: {
    flex: 1,
    borderWidth: GROSOR_LINEA,
    borderColor: COLOR_BORDE,
    borderRadius: RADIO_BORDE_ESTANDAR,
    paddingHorizontal: ESPACIADO_MEDIANO,
    height: ALTURA_CAJA_TEXTO,
  },
  botonAgregar: {
    backgroundColor: COLOR_BOTON_PRIMARIO,
    paddingHorizontal: RADIO_BORDE_REDONDEADO,
    borderRadius: RADIO_BORDE_ESTANDAR,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotonAgregar: {
    color: COLOR_TEXTO_BLANCO,
    fontWeight: GROSOR_FUENTE_SEMI_NEGRITA,
  },
  fila: {
    flexDirection: "row",
    paddingVertical: ESPACIADO_MEDIANO,
    paddingHorizontal: ESPACIADO_PEQUENO,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textoFila: {
    fontSize: TAMANO_FUENTE_NORMAL,
  },
  textoTachado: {
    textDecorationLine: "line-through",
    color: COLOR_TEXTO_TACHADO,
  },
  pildora: {
    minWidth: TAMANO_PILDORA,
    height: TAMANO_PILDORA,
    borderRadius: RADIO_BORDE_REDONDEADO,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: GROSOR_FUENTE_EXTRA_NEGRITA,
  },
  pildoraPendiente: {
    backgroundColor: COLOR_FONDO_PENDIENTE,
    color: COLOR_TEXTO_SECUNDARIO,
  },
  pildoraComprada: {
    backgroundColor: COLOR_FONDO_EXITO,
    color: COLOR_TEXTO_BLANCO,
  },
  separador: {
    height: GROSOR_LINEA,
    backgroundColor: COLOR_SEPARADOR,
  },
  textoListaVacia: {
    textAlign: "center",
    color: COLOR_TEXTO_VACIO,
    marginTop: ESPACIADO_EXTRA_GRANDE,
  },
  rellenoLista: {
    paddingBottom: ESPACIADO_RELLENO_LISTA,
  },
});
