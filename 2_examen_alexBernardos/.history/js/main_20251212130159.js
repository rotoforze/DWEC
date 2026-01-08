// js/main.js

import { cargarDatos } from "./dataManager.js";

function init(){
    // iniciamos la app
    console.log('%c Iniciando...', "color:green;");

    cargarDatos();
    const modal = document.querySelector(".modal-overlay");
    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
    });

    const formReview = document.querySelector("#review-form");
    formReview.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!formReview.rating.value) {
            document.querySelector('.star-rating').parentElement.querySelector(".error-message").innerHTML = "Debe indicarse una puntuación.";
        }
    })

}


document.addEventListener('DOMContentLoaded', init);