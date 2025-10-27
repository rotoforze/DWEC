import { productos } from './datos/datos.js';
import { mostrarListaProductos } from './creadorElementos.js';
import { buscar } from './buscar.js';
import { filtroCategoria } from './filtrarCategoria.js';

const categorias = new Set();
let precioMinimo = 999;
let precioMaximo = -999;

document.addEventListener('DOMContentLoaded', () => {

    cargarProductos(productos)

    // poner todos los escuchadores de eventos
    // filtro de búsqueda por nombre
    const buscador = document.querySelector('#buscador');
    buscador.addEventListener('input', () => {
        cargarProductos(buscar(buscador.value, productos));
    })

    // filtro de categoría si no es todas
    const contenedorFiltroCategoria = document.querySelector('#filtroCategoria');
    contenedorFiltroCategoria.addEventListener('change', () => {
        cargarProductos(filtroCategoria(contenedorFiltroCategoria.value, productos));
    })

    // filtro de precio mínimo y máximo

    // ordenar array
});

function cargarProductos(productos) {
    const contenedorClon = document.querySelector('.lista-productos').cloneNode();
    document.querySelector('.lista-productos').parentElement.replaceChild(contenedorClon, document.querySelector('.lista-productos'));
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