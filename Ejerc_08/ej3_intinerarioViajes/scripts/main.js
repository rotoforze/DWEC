import { creadorTarjetas } from './creadorTarjetas.js';
import { datos } from './datos/datos.js';

window.addEventListener('DOMContentLoaded', importarDatos);

function importarDatos() {
    const contenedorActividades = document.querySelector('.listaActividades');
    const tipos = new Set();
    datos.forEach((item) => {
        // guardamos el tipo en un set para evitar duplicados
        if (!tipos.has(item.tipo)) tipos.add(item.tipo);
        // creamos la tarjeta con sus datos
        contenedorActividades.appendChild(creadorTarjetas(item.id, item.nombre, item.destino, item.precio,
            item.duracionHoras, item.tipo, item.imagen));
    });
    // metemos los tipos en el select con clase listaTiposActividades
    addTipos(tipos);
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
        label.textContent = tipo;
        lista.appendChild(label);

        lista.appendChild(document.createElement('br'));
    });
}