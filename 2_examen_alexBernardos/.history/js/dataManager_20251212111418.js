
let horarios;
let artistas;
let escenarios;
let generos;


export async function fetchingAllData() {

    // guardo los horarios
    horarios = await fetchRute("./data/horarios.json");
    // guardo los artistas
    artistas = await fetchRute("./data/artistas.json");
    // guardo los escenarios
    escenarios = await fetchRute("./data/escenarios.json");
    

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