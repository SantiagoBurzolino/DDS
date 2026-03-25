# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.




### **Manual de usuario**

**1. Crear proyecto (si no lo hiciste)**

```
bunx create-expo-app lista-compras
cd lista-compras
bun start
```

Abrí el QR con **Expo Go**.

### **2. UI y lógica básica**

Abrí `lista-compras/app/(tabs)/index.tsx` y reemplazá por:

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


**Cómo usar:**

- Escribí un producto y tocá **Agregar** o **Enter**.
- Tocá un ítem para **marcar/desmarcar** (hecho).
- **Dejá apretado** un ítem para **eliminarlo**.