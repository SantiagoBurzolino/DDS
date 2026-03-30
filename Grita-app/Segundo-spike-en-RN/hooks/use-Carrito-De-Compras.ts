import { useState } from 'react';
import { Producto } from '../constants/Type';

export function useCarritoDeCompras() {

  const [listaDeProductos, setListaDeProductos] = useState<Producto[]>([]);

  const agregarProducto = (nombreNuevoProducto: string) => {
    const nombreLimpio = nombreNuevoProducto.trim();
    if (!nombreLimpio) return;

    const nuevoProducto: Producto = {
      id: String(Date.now()),
      nombre: nombreLimpio,
      estaComprado: false, 
    };

    setListaDeProductos((productosAnteriores) => [...productosAnteriores, nuevoProducto]);
  };

  
  const alternarEstadoDeCompra = (idDelProducto: string) => {
    setListaDeProductos((productosAnteriores) =>
      productosAnteriores.map((producto) =>
        producto.id === idDelProducto
          ? { ...producto, estaComprado: !producto.estaComprado }
          : producto
      )
    );
  };

  
  const eliminarProducto = (idDelProducto: string) => {
    setListaDeProductos((productosAnteriores) =>
      productosAnteriores.filter((producto) => producto.id !== idDelProducto)
    );
  };

  
  return {
    listaDeProductos,
    agregarProducto,
    alternarEstadoDeCompra,
    eliminarProducto,
  };
}