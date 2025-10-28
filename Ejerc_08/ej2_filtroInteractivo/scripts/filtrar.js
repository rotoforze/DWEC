import { buscar } from './filtros/buscar.js';
import { filtroCategoria } from './filtros/filtrarCategoria.js';
import { filtrarPrecio } from './filtros/filtrarPrecios.js';
import { ordenar } from './filtros/ordenar.js';

export function filtrarProductos(listaProductos) {
    // primero filtramos por la búsqueda
    const buscador = document.querySelector('#buscador');
    if (buscador.value) listaProductos = buscar(buscador.value, listaProductos);

    // ahora filtramos por las categorías
    const contenedorFiltroCategoria = document.querySelector('#filtroCategoria');
    if (contenedorFiltroCategoria.value != 'all') listaProductos = filtroCategoria(contenedorFiltroCategoria.value, listaProductos)
    
    // ahora filtramos por precioMaximo
    listaProductos = filtrarPrecio(document.querySelector('#filtroPrecio').value, listaProductos)

    // ordenamos según el selecionado
    listaProductos = ordenar(document.querySelector('.seleccionado').getAttribute('id'), listaProductos)

    // lo devolvemos filtrado
    return listaProductos
}