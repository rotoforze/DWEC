import { creadorTarjetas } from './creadorTarjetas.js';
import { datos } from './datos/datos.js';
import { filtrarActividades } from './filtro.js';

window.addEventListener('DOMContentLoaded', () => {
    importarDatos();
    document.querySelector('#fechaInicio').addEventListener('input', () => {
        if (new Date(document.querySelector('#fechaInicio').value).toLocaleDateString() < new Date().toLocaleDateString()) {
            document.querySelector('#fechaInicio').value = null;
            document.querySelector('.errorFecha').hidden = false;
        } else {
            document.querySelector('.errorFecha').hidden = true;
        }
    })

    document.querySelector('#nombreCompleto').addEventListener(('input'), () => {
        if (!document.querySelector('#nombreCompleto').value) {
            document.querySelector('.errorNombre').hidden = false;
        } else document.querySelector('.errorNombre').hidden = true;
    })

    document.querySelector('#email').addEventListener(('input'), () => {
        if (!document.querySelector('#email').value) {
            document.querySelector('.errorCorreo').hidden = false;
        } else document.querySelector('.errorCorreo').hidden = true;
    })
    document.querySelector('#codDescuento').addEventListener(('input'), () => {
        const regexDescuento = /^[A-Za-z]{4}\d{2}$/;
        if (!regexDescuento.test(document.querySelector('#codDescuento').value)) {
            document.querySelector('.errorCodigo').hidden = false;
        } else document.querySelector('.errorCodigo').hidden = true;
    })
    document.querySelector('#codDescuento').addEventListener(('input'), () => {
        const regexDescuento = /^[A-Za-z]{4}\d{2}$/;
        if (!regexDescuento.test(document.querySelector('#codDescuento').value)) {
            document.querySelector('.errorCodigo').hidden = false;
        } else document.querySelector('.errorCodigo').hidden = true;
    })
    document.querySelector('#seguroViaje').addEventListener(('change'), () => {
        if (!document.querySelector('#seguroViaje').checked && document.querySelector('#seguroViaje').required) {
            document.querySelector('.errorSeguro').hidden = false;
        } else document.querySelector('.errorSeguro').hidden = true;
    })
    document.querySelector('.reserva').addEventListener('submit', (e) => {
        if (!validar()) e.preventDefault();
    });
});

// esta función se ejecuta una vez
function importarDatos() {
    const tipos = new Set();
    const destinos = new Set();
    let precioMax = -999;
    let precioMin = 999;
    datos.forEach((item) => {
        // guardamos el tipo y el destino en un set para evitar duplicados
        if (!tipos.has(item.tipo)) tipos.add(item.tipo);
        if (!destinos.has(item.destino)) destinos.add(item.destino);
        // comprobamos si el precio es > al maximo
        if (item.precio > precioMax) precioMax = item.precio;
        if (item.precio < precioMin) precioMin = item.precio;
    });
    // metemos los tipos en el select con clase listaTiposActividades
    addTipos(tipos);
    addDestino(destinos);
    addPrecioMax(precioMax, precioMin);
    // creamos las tarjetas con datos
    recargarActividades(datos)
}

function recargarActividades(listaActividades) {
    validar();
    const contenedorActividades = document.querySelector('.listaActividades').cloneNode();
    listaActividades = filtrarActividades(listaActividades);
    listaActividades.forEach((item) => {
        contenedorActividades.appendChild(creadorTarjetas(item.id, item.nombre, item.destino, item.precio,
            item.duracionHoras, item.tipo, item.imagen));
    });
    document.querySelector('.listaActividades').parentElement.replaceChild(contenedorActividades, document.querySelector('.listaActividades'))
}

function addTipos(tipos) {
    const lista = document.querySelector('.listaTiposActividades');
    tipos.forEach((tipo) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = tipo;
        checkbox.id = `tipoActividad`;
        checkbox.addEventListener('change', () => {
            recargarActividades(datos);
        });
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
    destinosSelect.addEventListener('change', () => {
        recargarActividades(datos);
    })
}

function addPrecioMax(precioMax, precioMin) {
    const rango = document.querySelector('#precioMaximo');
    rango.min = precioMin;
    rango.max = precioMax;
    rango.value = precioMax;
    document.querySelector('.precioActual').textContent = rango.value;
    rango.addEventListener('input', () => {
        document.querySelector('.precioActual').textContent = rango.value;
        recargarActividades(datos);
    })
}
export function validar() {
    recalcular();
    let valida = true;
    document.querySelector('.listaItinerarios').previousElementSibling.hidden = document.querySelector('.listaItinerarios').firstChild ? true : false;
    if (!document.querySelector('.listaItinerarios').previousElementSibling.hidden) {
        valida = false;
        document.querySelector('.errorItinerariosVacios').hidden = false;
    } else document.querySelector('.errorItinerariosVacios').hidden = true;

    if (!document.querySelector('#nombreCompleto').value) valida = false;

    if (!document.querySelector('#email').value) valida = false;

    if (!document.querySelector('#fechaInicio').value) valida = false;

    if (!document.querySelector('#seguroViaje').checked && document.querySelector('#seguroViaje').required) {
        valida = false;
        document.querySelector('.errorSeguro').hidden = false;
    } else document.querySelector('.errorSeguro').hidden = true;

    return valida;
}
export function recalcular() {
    let sumaPrecio = 0;
    let sumaHoras = 0;
    let contadorActividades = 0;
    document.querySelectorAll('.listaItinerarios tr').forEach((hijo) => {
        sumaPrecio += Number.parseInt(hijo.querySelector('.precio-actividad-itinerario').textContent);
        sumaHoras += Number.parseInt(hijo.getAttribute('horas'));
        contadorActividades++;
    })
    if (sumaPrecio >= 1000) {
        document.querySelector('#seguroViaje').required = true;
    } else document.querySelector('#seguroViaje').required = false;
    document.querySelector('.precioTotal').textContent = sumaPrecio;
    document.querySelector('.duracionTotal').textContent = sumaHoras;
    document.querySelector('.totalActividades').textContent = contadorActividades;
}