export function filtroPrecio(listaActividades) {
    return listaActividades.filter((actividad) => {
        if (actividad.precio <= document.querySelector('#precioMaximo').value) return actividad;
    })
}