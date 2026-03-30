import { Text, Pressable, StyleSheet } from 'react-native';
import { Producto } from '../../constants/Type';
import { COLORES, MEDIDAS } from '../../constants/colors';

type Props = {
  producto: Producto;
  alAlternarEstado: (id: string) => void;
  alEliminar: (id: string) => void;
};

export function FilaParaItemDeCompra({ producto, alAlternarEstado, alEliminar }: Props) {
  const estiloDelTexto = [
    estilos.textoFila, 
    producto.estaComprado && estilos.textoTachado
  ];

  const estiloDeLaPildora = [
    estilos.pildora, 
    producto.estaComprado ? estilos.pildoraComprada : estilos.pildoraPendiente
  ];

  const iconoDeEstado = producto.estaComprado ? '✔' : '•';

  return (
    <Pressable
      onPress={() => alAlternarEstado(producto.id)}
      onLongPress={() => alEliminar(producto.id)}
      style={estilos.fila}
    >
      <Text style={estiloDelTexto}>
        {producto.nombre}
      </Text>
      <Text style={estiloDeLaPildora}>
        {iconoDeEstado}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    paddingVertical: MEDIDAS.espaciado.mediano,
    paddingHorizontal: MEDIDAS.espaciado.pequeno,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textoFila: { 
    fontSize: MEDIDAS.fuentes.normal 
  },
  textoTachado: {
    textDecorationLine: 'line-through',
    color: COLORES.textoTachado,
  },
  pildora: {
    minWidth: MEDIDAS.radios.tamanoPildora,
    height: MEDIDAS.radios.tamanoPildora,
    borderRadius: MEDIDAS.radios.redondeado,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
  },
  pildoraPendiente: {
    backgroundColor: COLORES.fondoPendiente,
    color: COLORES.textoSecundario,
  },
  pildoraComprada: {
    backgroundColor: COLORES.fondoExito,
    color: COLORES.textoBlanco,
  },
});