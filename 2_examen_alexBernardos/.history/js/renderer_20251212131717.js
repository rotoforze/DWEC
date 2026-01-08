import { getArtista, getEscenario, getHorario } from "./dataManager.js";
/**
 * Recibe los horarios y usando la función nuevatarjeta, los crea y añade al dom
 * 
 * @param {Object} horarios 
 */
export function renderTarjetas(horarios) {
    const contenedor = document.querySelector("#artist-list");
    contenedor.innerHTML = "";
    if (horarios.length == 0) {
        contenedor.innerHTML += (`<h3>No hay coincidencias para los filtros.</h3>`);

    } else {
        for (const horario of horarios) {
            contenedor.innerHTML += nuevaTarjeta(horario.artistaId, horario.dia,
                horario.horaInicio, horario.escenarioId);
        }
        document.querySelectorAll('.add-to-plan').forEach((btn) => {
            btn.addEventListener('click', () => {
                const horario = getHorario(btn.getAttribute('data-artistaid'),
                    btn.getAttribute('data-escenarioid'), btn.getAttribute('data-fecha'));
                if (horario) {
                    addPlan(horario);
                }
            })
        });
    }
}

/**
 * Crea el contenido html con los datos recibidos y lo devuelve.
 * 
 * @param {String} artistaId 
 * @param {String} dia 
 * @param {String} horaInicio 
 * @param {String} escenarioId 
 * @returns {HTMLElement}
 */
function nuevaTarjeta(artistaId, dia, horaInicio, escenarioId) {
    return (`
        <div class="artist-card">
            <h3>${getArtista(artistaId).nombre}</h3>
            <p>${getArtista(artistaId).genero} - ${getArtista(artistaId).pais}</p>
            <div class="card-schedule-info">
                <span>${dia} a las ${horaInicio}</span>
                <span>${getEscenario(escenarioId).nombre}</span>
            </div>
            <button class="add-to-plan" data-artistaId="${artistaId}"
            data-escenarioId="${escenarioId}" data-fecha="${dia}">Añadir a mi plan</button>
        </div>
        `);
}

let planes = new Set();
/**
 * 
 * Recibe un artista 
 * 
 * @param {String} artistaId 
 */
function addPlan(horario) {
    if (!planes.has(horario)) {
        document.querySelector("#plan-list").innerHTML += (`
            <li class="plan-item-info" data-artistaid="${horario.artistaId}"
            data-escenarioid="${horario.escenarioId}" data-dia="${horario.dia}">
                <strong>${getArtista(horario.artistaId).nombre}</strong>
                <span>${getEscenario(horario.escenarioId).nombre} ${horario.dia} @ ${horario.horaInicio}</span>
                <div class="plan-item-actions">
                    <button class="btn-review">Dejar reseña</button>
                    <button class="btn-delete">Eliminar</button>
                </div>
                </li>
                `);
        // btn reseña
        document.querySelectorAll(".btn-review").forEach((btn) => {
            const padreConDatos = btn.parentElement.parentElement;



            btn.addEventListener('click', () => {
                const modal = document.querySelector('.modal-overlay');

                modal.setAttribute("data-artistaid", padreConDatos.getAttribute("data-artistaid"))
                modal.setAttribute("data-escenarioid", padreConDatos.getAttribute("data-escenarioid"))
                modal.setAttribute("data-dia", padreConDatos.getAttribute("data-dia"))

                modal.querySelector("h3").textContent = `Dejar una reseña para ${getArtista(padreConDatos.getAttribute("data-artistaid")).nombre}`;

                modal.style.display = "flex";
                document.querySelectorAll('.error-message').forEach((elm) => elm.innerHTML = "");

            })
        })
        // btn borrado
        document.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", () => {
                const padreConDatos = btn.parentElement.parentElement;
                planes.delete(getHorario(padreConDatos.getAttribute("data-artistaid"),
                    padreConDatos.getAttribute("data-escenarioid"),
                    padreConDatos.getAttribute("data-dia")));
                padreConDatos.remove();
            })
        })

    }
}

export function limpiarEstrellas() {
    document.querySelector('.star-rating').innerHTML = (`                    <div class="star-rating">
                        <!-- Campos de radio para la calificación por estrellas (5 a 1) -->
                        <input type="radio" id="star5" name="rating" value="5" required><label for="star5" title="5 stars">★</label>
                        <input type="radio" id="star4" name="rating" value="4"><label for="star4" title="4 stars">★</label>
                        <input type="radio" id="star3" name="rating" value="3"><label for="star3" title="3 stars">★</label>
                        <input type="radio" id="star2" name="rating" value="2"><label for="star2" title="2 stars">★</label>
                        <input type="radio" id="star1" name="rating" value="1"><label for="star1" title="1 star">★</label>
                    </div>`);
}

/**
 * Recibe una fecha y la añade al dom como radiobutton
 * 
 * @param {String} fecha 
 */
export function addFecha(fecha) {
    document.querySelector('#filter-day').innerHTML += (`
        <label>
            <input type="radio" name="day" value="${fecha}">
            ${fecha}
        </label>
        `);
}