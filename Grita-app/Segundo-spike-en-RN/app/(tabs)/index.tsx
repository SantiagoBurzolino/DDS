import { useState } from 'react';
import { useCarritoDeCompras } from '../../hooks/use-Carrito-De-Compras';
import { FilaParaItemDeCompra } from '@/components/ui/Fila-Para-Item-De-Compra';
import { ContenedorDeListaDeCompras } from '../../components/container/contenedor-de-lista-de-compras';
import { ContenedorDePantalla } from '../../components/container/contenedor-de-pantalla';

export default function ControladorDeListaDeCompras() {
  const { 
    listaDeProductos, 
    agregarProducto, 
    alternarEstadoDeCompra, 
    eliminarProducto 
  } = useCarritoDeCompras();
  
  const [nombreDelNuevoProducto, setNombreDelNuevoProducto] = useState('');

  const procesarNuevoProducto = () => {
    agregarProducto(nombreDelNuevoProducto);
    setNombreDelNuevoProducto('');
  };

  return (
    <ContenedorDePantalla titulo=" Lista de Compras">
      
      <FilaParaItemDeCompra 
        producto={nombreDelNuevoProducto}
        alCambiarTexto={setNombreDelNuevoProducto}
        alEnviar={procesarNuevoProducto}
      />

      <ContenedorDeListaDeCompras
        productos={listaDeProductos}
        alAlternarEstado={alternarEstadoDeCompra}
        alEliminar={eliminarProducto}
      />

    </ContenedorDePantalla>
  );
}