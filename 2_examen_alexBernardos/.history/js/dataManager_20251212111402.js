
let horarios;
let artistas;
let escenarios;
let generos;


export async function fetchingAllData() {

    horarios = await fetchRute("./data/horarios.json");
    console.log(horarios)
    artistas = await fetchRute("./data/artistas.json");
    console.log(artistas)
    escenarios = await fetchRute("./data/escenarios.json");
    console.log(escenarios)

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