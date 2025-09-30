const playlist = [
    {
        titulo: `Eres tonto`,
        artista: `El canto del loco`,
        duracion: 140
    },
    {
        titulo: `Zapatillas`,
        artista: `El canto del loco`,
        duracion: 136
    },
    {
        titulo: `Besos`,
        artista: `El canto del loco`,
        duracion: 202
    },
    {
        titulo: `Peter Pan`,
        artista: `El canto del loco`,
        duracion: 179
    },
    {
        titulo: `Tu jardín con enanitos`,
        artista: `Melendi`,
        duracion: 224
    },
    {
        titulo: `Tocado y hundido`,
        artista: `Melendi`,
        duracion: 120
    },
    {
        titulo: `Caminando por la vida`,
        artista: `Melendi`,
        duracion: 102
    },
    {
        titulo: `Normal`,
        artista: `Carolina Durante`,
        duracion: 294
    },
    {
        titulo: `Será`,
        artista: `El canto del loco`,
        duracion: 154
    },
    {
        titulo: `Sin noticias de Holanda`,
        artista: `Melendi`,
        duracion: 162
    }
];
export function obtenerPlaylist() {
    return playlist;
}

// playlist.forEach(cancion => console.log(`La canción ${cancion.titulo} de el artista ${cancion.artista}`));