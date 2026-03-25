import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

type Producto = {
  id: string;
  nombre: string;
  estaComprado: boolean;
};

const ICONO_COMPRADO = '✔';
const ICONO_PENDIENTE = '•';
const COLOR_FONDO_PANTALLA = '#fff';
const COLOR_BOTON_AGREGAR = '#1e90ff';

export default function PantallaListaDeCompras() {
  const [listaDeProductos, setListaDeProductos] = useState<Producto[]>([]);
  const [nombreNuevoProducto, setNombreNuevoProducto] = useState('');

  const agregarProductoALaLista = () => {
    const nombreProductoLimpio = nombreNuevoProducto.trim();
    
    if (!nombreProductoLimpio) return;

    setListaDeProductos((productosAnteriores) => [
      ...productosAnteriores,
      { 
        id: String(Date.now()), 
        nombre: nombreProductoLimpio, 
        estaComprado: false 
      },
    ]);
    
    setNombreNuevoProducto('');
  };

  const alternarEstadoDeCompraDelProducto = (idDelProducto: string) => {
    setListaDeProductos((productosAnteriores) =>
      productosAnteriores.map((producto) =>
        producto.id === idDelProducto 
          ? { ...producto, estaComprado: !producto.estaComprado } 
          : producto
      )
    );
  };

  const eliminarProductoDeLaLista = (idDelProducto: string) => {
    setListaDeProductos((productosAnteriores) => 
      productosAnteriores.filter((producto) => producto.id !== idDelProducto)
    );
  };

  const renderizarFilaDeProducto = ({ item: producto }: { item: Producto }) => (
    <Pressable
      onPress={() => alternarEstadoDeCompraDelProducto(producto.id)}
      onLongPress={() => eliminarProductoDeLaLista(producto.id)}
      style={estilos.fila}
    >
      <Text style={[estilos.textoFila, producto.estaComprado && estilos.textoTachado]}>
        {producto.nombre}
      </Text>
      <Text style={[estilos.pildora, producto.estaComprado ? estilos.pildoraComprada : estilos.pildoraPendiente]}>
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
        <Pressable style={estilos.botonAgregar} onPress={agregarProductoALaLista}>
          <Text style={estilos.textoBotonAgregar}>Agregar</Text>
        </Pressable>
      </View>

      <FlatList
        data={listaDeProductos}
        keyExtractor={(producto) => producto.id}
        renderItem={renderizarFilaDeProducto}
        ListEmptyComponent={
          <Text style={estilos.textoListaVacia}>Sin productos. ¡Agregá el primero! 😊</Text>
        }
        ItemSeparatorComponent={() => <View style={estilos.separador} />}
        contentContainerStyle={estilos.rellenoLista}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: { flex: 1, padding: 16, gap: 12, backgroundColor: COLOR_FONDO_PANTALLA },
  titulo: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  filaDeEntradaDatos: { flexDirection: 'row', gap: 8 },
  cajaDeTexto: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  botonAgregar: {
    backgroundColor: COLOR_BOTON_AGREGAR,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotonAgregar: { color: '#fff', fontWeight: '600' },
  fila: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textoFila: { fontSize: 16 },
  textoTachado: { textDecorationLine: 'line-through', color: '#999' },
  pildora: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
  },
  pildoraPendiente: { backgroundColor: '#eee', color: '#666' },
  pildoraComprada: { backgroundColor: '#2ecc71', color: '#fff' },
  separador: { height: 1, backgroundColor: '#eee' },
  textoListaVacia: { textAlign: 'center', color: '#777', marginTop: 24 },
  rellenoLista: { paddingBottom: 32 }
});