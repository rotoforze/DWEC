import { cargarDatos } from "./productos.js";
import { eventoBotonLogin, mostrarRuedaCargando, quitarRuedaCargado, tryToLogIn } from "./renderer.js";
import { tieneSesionGuardada } from "./userManager.js";

/**
 * Función que inicia la aplicación
 */
async function init() {
    console.log(localStorage)
    mostrarRuedaCargando(document.querySelector("body"));
    cargarDatos();
    eventoBotonLogin();
    quitarRuedaCargado(document.querySelector("body"));
    document.querySelector(".app").hidden = false;
    if (tieneSesionGuardada()) {
        await tryToLogIn();
    }
}

document.addEventListener('DOMContentLoaded', init);