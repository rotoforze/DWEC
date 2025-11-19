let data;
let cantidadMensajes = 0;
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
            if (mandarComentario()) {
                addMensaje(undefined, document.querySelector('#autor').value, document.querySelector('#mensaje').value);
                clearForm();
            }

        }else {
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

function mandarComentario() {
    // se manda al servidor, si status == 200 devuelve true
    return true;
}

function clearForm() {
    document.querySelector('#autor').value = "";
    document.querySelector('#mensaje').value = "";
}

function validarForm() {
    if (document.querySelector('#autor').value && document.querySelector('#mensaje')) {
        return true;
    }else return false;
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

function parseData() {
    for (const msj of data) {
        addMensaje(msj.id, msj.content.author, msj.content.message);
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