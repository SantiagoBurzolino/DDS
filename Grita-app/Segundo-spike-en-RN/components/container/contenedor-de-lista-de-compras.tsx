import { FlatList, View, Text, StyleSheet } from 'react-native';
import { FilaParaItemDeCompra } from '../ui/Fila-Para-Item-De-Compra';
import { Producto } from '../../constants/Type';
import { COLORES, MEDIDAS } from '../../constants/colors';

type Props = {
  productos: Producto[];
  alAlternarEstado: (id: string) => void;
  alEliminar: (id: string) => void;
};

export function ContenedorDeListaDeCompras({ productos, alAlternarEstado, alEliminar }: Props) {
  return (
    <FlatList
      data={productos}
      keyExtractor={(producto) => producto.id}
      renderItem={({ item }) => (
        <FilaParaItemDeCompra 
          producto={item} 
          alAlternarEstado={alAlternarEstado} 
          alEliminar={alEliminar} 
        />
      )}
      ListEmptyComponent={
        <Text style={estilos.textoListaVacia}>Sin productos. ¡Agregá el primero! 😊</Text>
      }
      ItemSeparatorComponent={() => <View style={estilos.separador} />}
    />
  );
}

const estilos = StyleSheet.create({
  separador: {
    height: MEDIDAS.grosorLinea,
    backgroundColor: COLORES.separador,
  },
  textoListaVacia: {
    textAlign: 'center',
    color: COLORES.textoVacio,
    marginTop: MEDIDAS.espaciado.extraGrande,
  },
});