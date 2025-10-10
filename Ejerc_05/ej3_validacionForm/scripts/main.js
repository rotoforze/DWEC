function generarInformeDeValidacion() {
    // guardamos sus valores
    const nombre = document.querySelector('[name="nombre"]').value;
    const email = document.querySelector('[name="email"]').value;

    // vaciamos el div del informe
    const divInforme = document.querySelector("#informe-errores");
    divInforme.textContent = '';

    // nos servirá para saver si hemos pasado el test
    let flag = true;

    // comrpobamos ambos campos
    if (!nombreValido(nombre)) {
        divInforme.appendChild(nuevoMensaje('El nombre debe tener más de 3 carácteres.'));
        flag = false;
    }
    if(!emailValido(email)) {
        divInforme.appendChild(nuevoMensaje('El correo no es válido.'));
        flag = false;
    }

    // si ninguno ha fallado, se imprime formulario valido
    if (flag) {
        divInforme.appendChild(nuevoMensaje('Formulario válido'));
    }
}

// para comprobar si el nombre es válido
function nombreValido(nombre) {
    if (nombre.length >= 3){
        return true;
    }else return false;
}

// para comprobar si el email es válido
function emailValido(email) {
    if (email.includes('@')) {
        return true;
    }else return false;
}

// para crear el parrafo con un mensaje
function nuevoMensaje(mensaje) {
    const parrafo = document.createElement('p');
    parrafo.textContent = mensaje;
    return parrafo;
}

// añadimos al boton un evento para generar el informe
document.querySelector('[value="Enviar"]').addEventListener('click', () => {
    generarInformeDeValidacion();
});