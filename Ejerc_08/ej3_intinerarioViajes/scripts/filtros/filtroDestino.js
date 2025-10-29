export function filtroDestino(listaActividades) {
    const destino = document.querySelector('#destinos').value;
    if (destino == 'all') return listaActividades;  
    return listaActividades.filter((actividad) => {
        if (actividad.destino == destino) return actividad;
    })
}