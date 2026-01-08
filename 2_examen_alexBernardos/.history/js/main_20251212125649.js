// js/main.js

import { cargarDatos } from "./dataManager.js";

function init(){
    // iniciamos la app
    console.log('%c Iniciando...', "color:green;");

    cargarDatos();
    const modal = document.querySelector(".modal-overlay");
    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
    })    

}


document.addEventListener('DOMContentLoaded', init);