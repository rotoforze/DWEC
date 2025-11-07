async function pedirDatos(documento) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.onload = () => {
            if (peticion.status == 200) {
                console.log(`%c Datos recibidos en ${documento}`, 'color: #87e833ff');
                resolve(peticion.response);
            } else if (peticion.status == 404) {
                console.log(`%c El archivo ${documento} no se ha encontrado.`, 'color: #ff3434ff');
                window.alert(`No se ha encontrado el archivo ${documento}`);
                reject;
            } else {
                console.log(`%c Error en la petición.`, 'color: #ff3434ff');
                reject;
            }
        };
        peticion.onerror = reject;
        peticion.open('GET', `./datos/${documento}`);
        peticion.responseType = 'document';
        peticion.setRequestHeader('Accept', 'text/html');
        peticion.send();
    });
}

async function validar() {
    const datos = await pedirDatos('personal.xml');
    const agente = datos.querySelector(`agente[codigo="${document.querySelector('#numAgente').value}"]`);
    if (agente) {
        if (agente.querySelector('clave').textContent == document.querySelector('#clave').value) {
            bienvenida(agente.querySelector('nombre').textContent)
        } else {
            error();
        }

    } else error();
}

document.querySelector('#numAgente').addEventListener('input', hayAgente);

function hayAgente() {
    if (document.querySelector('#numAgente').value.length > 0) {
        document.querySelector('#acceder').disabled = false;
    }else {
        document.querySelector('#acceder').disabled = true;
    }
}

function bienvenida(user) {
    document.querySelector('.error').hidden = true;
    document.querySelector('.agente').textContent = user;
    document.querySelector('.bienvenida').hidden = false;
}

function error() {
    document.querySelector('.bienvenida').hidden = true;
    document.querySelector('.error').hidden = false;
}