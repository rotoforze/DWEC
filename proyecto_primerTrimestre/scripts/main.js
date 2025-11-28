import { cargarDatos } from "./productos.js";
import { eventoBotonLogin, mostrarRuedaCargando, quitarRuedaCargado } from "./renderer.js";

/**
 * Función que inicia la aplicación
 */
function init() {
    mostrarRuedaCargando(document.querySelector("body"));
    cargarDatos();
    eventoBotonLogin();
    quitarRuedaCargado(document.querySelector("body"));
    document.querySelector(".app").hidden = false;
}

document.addEventListener('DOMContentLoaded', init);