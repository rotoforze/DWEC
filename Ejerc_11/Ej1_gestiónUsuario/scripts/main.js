let datos;

function init() {
    getData();

}

function mandarDatos() {
    document.querySelector('button').disabled = true;
    const spans = document.querySelectorAll('span');
    spans.forEach((span) => {
        datos[span.parentElement.id][span.id] = span.textContent;
    });
    const uls = document.querySelectorAll('ul');
    var hobbies = [];
    uls.forEach((ul) => {
        hobbies.push(ul.textContent)
    });
    datos.hobbies = hobbies;


    const request = new XMLHttpRequest();
    request.open('POST', 'https://cors-anywhere.herokuapp.com/https://webhook.site/9fc6ea26-fdb4-4706-8b44-9746817d6870', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(datos));
    request.onload = () => {
        if (request.status == 200) {
            document.querySelector('button').disabled = false;
            document.querySelector('#msj-confirmar').hidden = false;
            document.querySelector('#msj-error').hidden = true;
        } else {
            document.querySelector('button').disabled = false;
            document.querySelector('#msj-confirmar').hidden = true;
            document.querySelector('#msj-error').hidden = false;
        }
    };

}

function modificarDatos() {
    const btn = document.querySelector('.btn-primary');
    const cancelBtn = document.querySelector('#cancel');

    if (cancelBtn.disabled) {
        btn.textContent = 'Enviar Datos';
        btn.removeEventListener('click', modificarDatos)
        btn.addEventListener('click', mandarDatos);
        cancelBtn.addEventListener('click', () => {
            btn.textContent = 'Modificar datos';
            btn.removeEventListener('click', mandarDatos);
            btn.addEventListener('click', modificarDatos);
            cancelBtn.removeEventListener('click', modificarDatos);
            cancelBtn.disabled = true;
            cancelBtn.hidden = true;
        });
        cancelBtn.disabled = false;
        cancelBtn.hidden = false;
    }
}

function cambiarAInput(item) {
    const nuevoInput = document.createElement('input');
    nuevoInput.type = 'text';
    nuevoInput.value = item.textContent;
    nuevoInput.id = item.id
    nuevoInput.addEventListener('blur', () => {
        cambiarASpan(nuevoInput);
    });
    item.replaceWith(nuevoInput);
    nuevoInput.focus();
}

function cambiarASpan(item) {
    const nuevoSpan = document.createElement('span');
    nuevoSpan.textContent = item.value;
    nuevoSpan.id = item.id
    nuevoSpan.addEventListener('click', () => {
        cambiarAInput(nuevoSpan);
    });
    item.replaceWith(nuevoSpan);
    nuevoSpan.focus();
}

function parseData() {
    document.querySelector('#user-info #firstName').setAttribute("data-id", datos.id);
    document.querySelector('#user-info #firstName').textContent = datos.personalInfo.firstName;
    document.querySelector('#user-info #lastName').textContent = datos.personalInfo.lastName;
    document.querySelector('#user-info #email').textContent = datos.personalInfo.email;
    document.querySelector('#user-info #phone').textContent = datos.personalInfo.phone;

    document.querySelector('#user-location #street').textContent = datos.address.street;
    document.querySelector('#user-location #city').textContent = datos.address.city;
    document.querySelector('#user-location #zipCode').textContent = datos.address.zipCode;
    document.querySelector('#user-location #country').textContent = datos.address.country;

    document.querySelector('#user-preferences #theme').textContent = datos.preferences.theme;
    document.querySelector('#user-preferences #notifications').checked = datos.preferences.notifications;
    document.querySelector('#user-preferences #language').textContent = datos.preferences.language;

    for (const hobbie of datos.hobbies) {
        document.querySelector('#hobbies').innerHTML += `<ul id="${hobbie}">${hobbie}</ul>`
    }

    const spans = document.querySelectorAll('span');
    spans.forEach((span) => {
        span.addEventListener('click', () => {
            cambiarAInput(span);
        });
    });
    document.querySelector('.btn-primary').addEventListener('click', modificarDatos);
}

function getData() {
    const request = new XMLHttpRequest();

    request.onload = () => {
        datos = request.response;
        parseData();
    }

    request.open('GET', './data/user_data.json', true);
    request.responseType = 'json';
    request.setRequestHeader('Accept', 'application/json');
    request.send();
}

document.addEventListener('DOMContentLoaded', init)