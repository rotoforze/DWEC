// js/main.js

import { cargarDatos } from "./dataManager.js";

function init(){
    // iniciamos la app
    console.log('%c Iniciando...', "color:green;");

    cargarDatos();    

}


document.addEventListener('DOMContentLoaded', init);