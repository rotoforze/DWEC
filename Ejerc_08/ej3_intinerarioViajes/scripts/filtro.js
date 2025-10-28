import filtroDestino from './filtros/filtroDestino.js'
import filtroPrecio from './filtros/filtroPrecio.js'

function filtrarActividades(listaActividades) {
    // primero filtramos por destino
    listaActividades = filtroDestino(listaActividades);
    // luego filtramos por tipos
    listaActividades = filtroTipos(listaActividades);
    // por último por precio máximo
    return filtroPrecio(listaActividades);
}