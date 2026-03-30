import { View, Text, StyleSheet } from 'react-native';
import { COLORES, MEDIDAS } from '../../constants/colors';

type Props = {
  titulo: string;
  children: React.ReactNode;
};

export function ContenedorDePantalla({ titulo, children }: Props) {
  return (
    <View style={estilos.contenedorPrincipal}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    padding: MEDIDAS.espaciado.grande,
    gap: MEDIDAS.espaciado.mediano,
    backgroundColor: COLORES.fondoPrincipal,
  },
  titulo: {
    fontSize: MEDIDAS.fuentes.titulo,
    fontWeight: 'bold',
    marginTop: MEDIDAS.espaciado.mediano,
  },
});