
let conciertos;
let artistas;
let generos;
let escenarios;


export function fetchingAllData() {
    
}

async function fetchRute(rute) {
    new Promise(fetch(rute)
    .then(resp => resp.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}