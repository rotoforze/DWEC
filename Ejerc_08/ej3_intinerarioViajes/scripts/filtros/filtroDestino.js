export function filtroDestino(listaActividades) {
    return listaActividades.filter((actividad) => {
        if (actividad.destino == document.querySelector('#destinos').value) return actividad;
    })
}