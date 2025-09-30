import { obtenerPlaylist } from "./ejercicio-01.js";
const playlistFiltrada = obtenerPlaylist().filter((cancion) => {
    if (cancion.duracion <= 180) {
        return cancion;
    }
    return;
});

const arregloDeStrings = playlistFiltrada.map((cancion) => {
    return `La canción '${cancion.titulo}' de ${cancion.artista} dura ${cancion.duracion} segundos`;
});

arregloDeStrings.forEach(mensaje => console.log(mensaje ));
