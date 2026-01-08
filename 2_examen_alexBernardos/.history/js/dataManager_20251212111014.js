
let conciertos;
let artistas;
let generos;
let escenarios;


export async function fetchingAllData() {

    await fetchRute()

}

/**
 * Recibe una ruta, usando una promesa, hace un fetch y devuelve su resultado.
 * 
 * @param {File} rute 
 */
async function fetchRute(rute) {
    new Promise(fetch(rute)
        .then(resp => resp.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error)));
}