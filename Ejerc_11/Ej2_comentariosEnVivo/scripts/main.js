let data;
let cantidadMensajes = 1;
function init() {
    getData();
    document.querySelector('#publicar').addEventListener('click', (e) => {
        e.preventDefault();

        // valido el form
        if (validarForm()) {
            // OCULTO LOS ERRORES
            document.querySelector('.error-autor').hidden = true;
            document.querySelector('.error-msj').hidden = true;
            // manda el mensaje al serv, si lo recibe, lo muestra en la lista... 
            const objeto = newMensaje(document.querySelector('#autor').value, document.querySelector('#mensaje').value);
            mandarComentario(objeto);

        } else {
            // mostrar errores
            if (document.querySelector('#autor').value) {
                document.querySelector('.error-autor').hidden = true;
            } else document.querySelector('.error-autor').hidden = false;

            if (document.querySelector('#mensaje').value) {
                document.querySelector('.error-msj').hidden = true;
            } else document.querySelector('.error-msj').hidden = false;
        }
    });
}

async function mandarComentario(objeto) {
    document.querySelector(".error-conexion").hidden = true;
    const request = new XMLHttpRequest();
    request.open('POST', 'https://cors-anywhere.herokuapp.com/https://webhook.site/aa26bb1a-1dbd-4541-87bf-4174556ad904');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(objeto));
    request.onload = () => {
        if (request.status == 200) {
            console.log("ok")
            addMensaje(objeto.id ? objeto.id : cantidadMensajes, objeto.content.author, objeto.content.message);
            clearForm();
            return true;
        } else {
            console.error("not ok");
            document.querySelector(".error-conexion").hidden = false;
            return false;
        }
    };
}

function newMensaje(autor, contenido) {
    return {
        "id": cantidadMensajes,
        "publishedTime": new Date().toISOString(),
        "content": {
            "author": autor,
            "message": contenido
        }
    };
}

function clearForm() {
    document.querySelector('#autor').value = "";
    document.querySelector('#mensaje').value = "";
}

function validarForm() {
    if (document.querySelector('#autor').value && document.querySelector('#mensaje')) {
        return true;
    } else return false;

}

function getData() {
    const request = new XMLHttpRequest();

    request.onload = () => {
        data = request.response;
        parseData();
    }

    request.open('GET', './data/comments.json', true);
    request.responseType = 'json';
    request.setRequestHeader('Accept', 'application/json');
    request.send();
}

async function parseData() {
    for (const msj of data) {
        mandarComentario(msj);
    }
}

function addMensaje(id = cantidadMensajes, autor, msj) {
    cantidadMensajes++;
    document.querySelector('ul').innerHTML += `
    <li data-id="${id}">
    <div><strong>${autor}</strong></div>
    <div>${msj}</div>
    </li>
    `;
}

document.addEventListener('DOMContentLoaded', init);