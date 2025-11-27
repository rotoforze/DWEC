import { cargarDatos } from "./productos.js";
import { eventoBotonLogin } from "./renderer.js";

/**
 * Función que inicia la aplicación
 */
function init() {
    cargarDatos();
    eventoBotonLogin();
}

document.addEventListener('DOMContentLoaded', init);