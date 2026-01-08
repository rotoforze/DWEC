// js/main.js

import { cargarDatos, getArtista } from "./dataManager.js";
import { limpiarEstrellas } from "./renderer.js";

function init() {
    // iniciamos la app
    console.log('%c Iniciando...', "color:green;");

    cargarDatos();
    const modal = document.querySelector(".modal-overlay");
    const formReview = document.querySelector("#review-form");
    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
        limpiarEstrellas();
        formReview.comment.value = "";
        formReview.email.value = "";
    });

    formReview.addEventListener('submit', (e) => {
        e.preventDefault();
        let error = false;
        if (!formReview.rating.value) {
            document.querySelector('.star-rating').parentElement.querySelector(".error-message").innerHTML = "Debe indicarse una puntuación.";
            error = true;
        }
        if (!formReview.comment.value) {
            document.querySelector('#comment').parentElement.querySelector(".error-message").innerHTML = "Debe indicarse un comentario.";
            error = true;
        }
        if (!formReview.email.value && !formReview.email.validity.valid) {
            document.querySelector('#email').parentElement.querySelector(".error-message").innerHTML = "Debe indicarse un comentario.";
            error = true;
        }
        // si se han pasado las validaciones...
        if (!error) {
            const mensajeOk = document.querySelector('.success-message');
            mensajeOk.style.display = "flex";
            mensajeOk.innerHTML = `Se ha registrado la reseña para ${getArtista(modal.getAttribute("data-artistaid")).nombre}`;
            setTimeout(() => {
                mensajeOk.style.display = "none";
            }, 3000);
            const listaReviews = document.querySelector('#reviews-list');
            let estrellas = "";
            for (let i = 0; i < formReview.rating.value; i++) {
                estrellas += "<span>★</span>"
            }
            for (let i = 5; i>formReview.rating.value; i--) {
                estrellas += "<span>✩</span>"
            }
            listaReviews.innerHTML += (`
                <div class="review-card">
                    <h4>${getArtista(modal.getAttribute("data-artistaid")).nombre}</h4>
                    <div class="review-card-rating">
                        ${estrellas}
                    </div>
                    <p class="review-card-comment">"${formReview.comment.value}"</p>
                </div>
                `);
                limpiarEstrellas();
                formReview.comment.value = "";
                formReview.email.value = "";
                modal.style.display = "none";
        }
    })

}


document.addEventListener('DOMContentLoaded', init);