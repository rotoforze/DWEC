function init() {
    // enseñamos la rueda de carga
    document.querySelector('#loading-spinner').hidden = false;

    // get datos usuario
    getDatosUser(); // no recoge los datos de la url que pide el ejercicio???
}

async function getDatosUser() {
    await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then((response) => {
            console.log(datos.status)
            return response.json();
        })
        .then((datos) => {
            console.log(datos);
        })
        .catch((error) => {
            cambiarError("fetch");
            document.querySelector('#loading-spinner').hidden = true;
            console.error(error.message);
        })
}

function getPostsUser() {

}

function cambiarError(tipo) {
    switch (tipo) {
        case "fetch":
            document.querySelector(".error-fetch").hidden = document.querySelector(".error-fetch").hidden ? false : true;
            break;
    }
}

document.addEventListener('DOMContentLoaded', init);