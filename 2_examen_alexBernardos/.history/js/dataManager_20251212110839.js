
let conciertos;
let artistas;
let generos;
let escenarios;


export function fetchingAllData() {
    
}

function fetchRute(rute) {
    fetch(rute)
    .then(resp => resp.json())
    .then((data) => data)
    .catch((error) => console.error(error))
}