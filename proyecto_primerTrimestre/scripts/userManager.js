import { mostrarFormLogin, mostrarInfoUsuario } from "./renderer.js";

let userData;

/**
 * Recibe un usuario y una contraseña, comprueba si 
 * exite el usuario y si la contraseña coincide.
 * 
 * @param {String} user 
 * @param {String} psswd 
 */
export async function iniciarSesion(username, psswd) {
    console.log(getStoredData());
    const storedData = getStoredData();
    if (storedData != "undefined") {
        username = storedData?.mail == undefined ? username : storedData?.mail;
        psswd = storedData?.password == undefined ? psswd : storedData?.password;
    }
    
    return new Promise(
        function (resolve, reject) {
            fetch("./data/usuarios.json")
                .then((response) => {
                    return response.json();
                })
                .then((datos) => {
                    for (const user of datos) {
                        if (user.mail == username && user.password == psswd) {
                            if (tieneSesionGuardada() && storedData && storedData != "undefined") {
                                userData = getStoredData();
                            } else if (quiereGuardarSesion()) {
                                userData = user;
                                guardarSesion(JSON.stringify(user));
                            } else {
                                userData = user;
                            }
                            mostrarInfoUsuario(userData);
                            return resolve(true);
                        }
                    }
                    return reject();
                })
                .catch((error) => {
                    return reject(error);
                })
        }
    );
}

/**
 * Cierra la sesión borrando los datos del usuario.
 */
export function cerrarSesion() {
    userData = undefined;
    mostrarFormLogin();
    quiereGuardarSesion();
    guardarSesion();
}

/**
 * Devuelve un objeto con la información del usuario.
 * 
 * @returns Object
 */
export function getUserData() {
    return userData ? userData : false;
}

/**
 * Establece los datos recibidos como la información del usuario.
 * 
 * @param {Object} data 
 */
function setUserData(data) {
    userData = data ? data : undefined;
}

/**
 * Recibe un objeto de usuario y lo guarda en el local-storage.
 * 
 * @param {Object} user 
 */
function guardarSesion(user) {
    localStorage.setItem("user-data", user);
}

/**
 * Devuelve el objeto del user guardado en el local-storage.
 * 
 * @returns {Object}
 */
function getStoredData() {
    const item = localStorage.getItem("user-data");
    if (item != "undefined") {
        return JSON.parse(localStorage.getItem("user-data"));
    } return undefined;
}

/**
 * Devuelve true si está marcada la casilla de mantener sesión iniciada
 * y false si está desmarcada. A su vez, guarda en el local-storage
 * si quiere quedar logged o no.
 * 
 * @returns {boolean}
 */
function quiereGuardarSesion() {
    if (document.querySelector("#keep-logged").checked) {
        localStorage.setItem("keepLogged", true);
        return true;
    }
    localStorage.setItem("keepLogged", false);
    return false;
}

/**
 * Si está en true keepLogged en el localStorage, devuelve true, si no, false.
 * 
 * @returns {boolean}
 */
export function tieneSesionGuardada() {
    return localStorage.getItem("keepLogged") == "true" ? true : false; 
}