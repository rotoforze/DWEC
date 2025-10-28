import { creadorTarjetas } from './creadorTarjetas.js';
import { datos } from './datos/datos.js';

window.addEventListener('DOMContentLoaded', importarDatos);

function importarDatos() {
    const tipos = new Set();
    const destinos = new Set();
    let precioMax = -999;
    datos.forEach((item) => {
        // guardamos el tipo y el destino en un set para evitar duplicados
        if (!tipos.has(item.tipo)) tipos.add(item.tipo);
        if (!destinos.has(item.destino)) destinos.add(item.destino);
        // comprobamos si el precio es > al maximo
        if (item.precio > precioMax) precioMax = item.precio;
    });
    // creamos las tarjetas con datos
    recargarActividades(datos)
    // metemos los tipos en el select con clase listaTiposActividades
    addTipos(tipos);
    addDestino(destinos);
    addPrecioMax(precioMax);
}

function recargarActividades(listaActividades) {
    const contenedorActividades = document.querySelector('.listaActividades');
    listaActividades.forEach((item) => {
        contenedorActividades.appendChild(creadorTarjetas(item.id, item.nombre, item.destino, item.precio,
            item.duracionHoras, item.tipo, item.imagen));
    })
}

function addTipos(tipos) {
    const lista = document.querySelector('.listaTiposActividades');
    tipos.forEach((tipo) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = tipo;
        checkbox.id = `tipoActividad`;
        lista.appendChild(checkbox);

        const label = document.createElement('label');
        label.for = tipo;
        label.textContent = `- ${tipo}`;
        lista.appendChild(label);

        lista.appendChild(document.createElement('br'));
    });
}

function addDestino(destinos) {
    const destinosSelect = document.querySelector('#destinos');
    destinos.forEach((destino) => {
        const option = document.createElement('option');
        option.value = destino;
        option.textContent = destino;
        destinosSelect.appendChild(option);
    });
}

function addPrecioMax(precioMax) {
    const rango = document.querySelector('#precioMaximo');
    rango.min = 0;
    rango.max = precioMax;
    rango.value = precioMax;
    document.querySelector('.precioActual').textContent = rango.value;
    rango.addEventListener('input', () => {
        document.querySelector('.precioActual').textContent = rango.value;
    })
}