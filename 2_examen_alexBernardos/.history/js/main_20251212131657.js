// js/main.js

import { cargarDatos, getArtista } from "./dataManager.js";

function init() {
    // iniciamos la app
    console.log('%c Iniciando...', "color:green;");

    cargarDatos();
    const modal = document.querySelector(".modal-overlay");
    const formReview = document.querySelector("#review-form");
    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
        document.querySelector('.star-rating').innerHTML = (`                    <div class="star-rating">
                        <!-- Campos de radio para la calificación por estrellas (5 a 1) -->
                        <input type="radio" id="star5" name="rating" value="5" required><label for="star5" title="5 stars">★</label>
                        <input type="radio" id="star4" name="rating" value="4"><label for="star4" title="4 stars">★</label>
                        <input type="radio" id="star3" name="rating" value="3"><label for="star3" title="3 stars">★</label>
                        <input type="radio" id="star2" name="rating" value="2"><label for="star2" title="2 stars">★</label>
                        <input type="radio" id="star1" name="rating" value="1"><label for="star1" title="1 star">★</label>
                    </div>`);
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
        if (!formReview.email.value) {
            document.querySelector('#email').parentElement.querySelector(".error-message").innerHTML = "Debe indicarse un comentario.";
            error = true;
        }
        // si se han pasado las validaciones...
        if (!error) {
            const mensajeOk = document.querySelector('.success-message');
            mensajeOk.style.display = "flex";
            mensajeOk.innerHTML = `Se ha registrado la reseña para ${getArtista(modal.getAttribute("data-artistaid")).nombre}`;
            const listaReviews = document.querySelector('#reviews-list');
        }
        formReview.rating.value = "";
        formReview.comment.value = "";
        formReview.email.value = "";
    })

}


document.addEventListener('DOMContentLoaded', init);