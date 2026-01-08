
let horarios;
let artistas;
let escenarios;
let generos = [];


export async function cargarDatos() {

    console.log('%c Cargando datos de horarios.json, artistas.json, escenarios.json.', 'color:blue;');
    // guardo los horarios
    horarios = await fetchRute("./data/horarios.json");
    // guardo los artistas
    artistas = await fetchRute("./data/artistas.json");
    // guardo los escenarios
    escenarios = await fetchRute("./data/escenarios.json");
    console.log('%c Datos de horarios.json, artistas.json, escenarios.json, cargados correctamente.', 'color:blue;');
}

function sacarGeneros() {
    for (const artista of artistas) {
        if (generos.find(artista.genero) == -1) {
            generos.push(artista.genero);
        }
    }
}

/**
 * Recibe una ruta, usando una promesa, hace un fetch y devuelve su resultado.
 * 
 * @param {File} rute 
 */
async function fetchRute(rute) {
    return new Promise((resolve, reject) => 
        fetch(rute)
        .then(resp => resp.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error)));
}