import { mostrarFormLogin, mostrarInfoUsuario, mostrarRuedaCargando, quitarRuedaCargado } from "./renderer.js";

let userData;

/**
 * Recibe un usuario y una contraseña, comprueba si 
 * exite el usuario y si la contraseña coincide.
 * 
 * @param {String} user 
 * @param {String} psswd 
 */
export async function iniciarSesion(username, psswd) {
    // TODO: debe mostrar una rueda cargando por encima mientras ésto ocurre,
    // al terminar de cargar, borra todo el contenido y muestra la información del usuario
    // junto a un modal que avisa del correcto inicio de sesión.
    // rueda de carga
    mostrarRuedaCargando(document.querySelector(".form-login button"));
    
    return new Promise(
        function (resolve, reject) {
            fetch("./data/usuarios.json")
                .then((response) => {
                    return response.json();
                })
                .then((datos) => {
                    for (const user of datos) {
                        if (user.mail == username && user.password == psswd) {
                            userData = user;
                            mostrarInfoUsuario(getUserData());
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
    userData = data ? data : undefined;;
}