export function filtroTipos(listaActividades) {
    // cojo los tipos checked
    let actividades = [];
    document.querySelectorAll('#tipoActividad').forEach((checkbox) => {
        // me quedo con los que están marcados
        if (checkbox.checked) actividades.push(checkbox.name);
    });
    // si hay algo en actividades lo filtramos
    if (actividades.length != 0) {
        listaActividades = listaActividades.filter((actividad) => {
            if (actividades.includes(actividad.tipo)) return actividad;
        });
    }
    return listaActividades
}