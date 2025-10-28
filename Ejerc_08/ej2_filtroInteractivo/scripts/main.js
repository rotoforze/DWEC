import { productos } from './datos/datos.js';
import { mostrarListaProductos } from './creadorElementos.js';
import { filtrarProductos } from './filtrar.js';

const categorias = new Set();
let precioMinimo = 999;
let precioMaximo = -999;

document.addEventListener('DOMContentLoaded', () => {

    cargarProductos(productos);

    // poner todos los escuchadores de eventos
    // filtro de búsqueda por nombre
    const buscador = document.querySelector('#buscador');
    buscador.addEventListener('input', () => {
        cargarProductos(filtrarProductos(productos));
    })

    // filtro de categoría si no es todas
    const contenedorFiltroCategoria = document.querySelector('#filtroCategoria');
    contenedorFiltroCategoria.addEventListener('change', () => {
        cargarProductos(filtrarProductos(productos));
    })

    // filtro de precio mínimo y máximo
    const filtroPrecio = document.querySelector('#filtroPrecio');
    filtroPrecio.min = precioMinimo;
    filtroPrecio.max = precioMaximo;
    filtroPrecio.value = precioMaximo;

    const precioMaxAcutal = document.querySelector('.precioMaxAcutal');
    precioMaxAcutal.textContent = precioMaximo;
    filtroPrecio.addEventListener('input', () => {
        precioMaxAcutal.textContent = filtroPrecio.value;
        cargarProductos(filtrarProductos(productos));
    })

    // ordenar array
    document.filtros.filtroOrden.forEach((filtro) => {
        filtro.addEventListener('input', () => {
            document.querySelector('.seleccionado').classList.remove('seleccionado');
            filtro.classList.add('seleccionado');
            cargarProductos(filtrarProductos(productos));
        })
    })
});

function cargarProductos(productos) {
    const contenedorClon = document.querySelector('.lista-productos').cloneNode();
    document.querySelector('.lista-productos').parentElement.replaceChild(contenedorClon, document.querySelector('.lista-productos'));
    if (productos.length <= 0) {
        const mensajeError = document.createElement('h1');
        mensajeError.textContent = '¡No hay productos que cumplan los criterios!';
        contenedorClon.appendChild(mensajeError);
    }
    productos.forEach((producto) => {
        // meter lista
        contenedorClon.appendChild(mostrarListaProductos(producto));
        // coger las categorías únicas para
        // ponerlas en el campo select
        if (!categorias.has(producto.categoria)) {
            categorias.add(producto.categoria);
            // meter la categoría en el selector
            const nuevaOpcion = document.createElement('option');
            nuevaOpcion.value = producto.categoria;
            nuevaOpcion.textContent = producto.categoria;
            document.querySelector('#filtroCategoria').appendChild(nuevaOpcion);
        }
        // coger el precio mínimo y el máximo
        // para ponerlo en el campo range
        if (producto.precio > precioMaximo) precioMaximo = producto.precio;
        if (producto.precio < precioMinimo) precioMinimo = producto.precio;
    });
}