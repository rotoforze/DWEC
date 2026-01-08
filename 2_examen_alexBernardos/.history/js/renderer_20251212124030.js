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
        
    }else {
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

let planes = [];
/**
 * 
 * Recibe un artista 
 * 
 * @param {String} artistaId 
 */
function addPlan(horario) {
    if (!planes.includes(horario)) {
        
        const id = planes.push(horario) -1
        document.querySelector("#plan-list").innerHTML += (`
            <li class="plan-item-info" data-id="${id}">
            <strong>${getArtista(horario.artistaId).nombre}</strong>
            <span>${getEscenario(horario.escenarioId).nombre} ${horario.dia} @ ${horario.horaInicio}</span>
            <div class="plan-item-actions">
            <button class="btn-review">Dejar reseña</button>
            <button class="btn-delete">Eliminar</button>
            </div>
            </li>
            `);
            document.querySelectorAll(".btn-delete").forEach((btn) => {
                btn.addEventListener("click", () => {
                    console.log(planes)
                    planes.pop(btn.parentElement.parentElement.getAttribute("data-id"));
                    btn.parentElement.parentElement.remove();
                })
            })
            console.log(planes)
    }
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