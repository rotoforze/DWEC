import { getArtista, getEscenario } from "./dataManager.js";
/**
 * Recibe los horarios y usando la función nuevatarjeta, los crea y añade al dom
 * 
 * @param {Object} horarios 
 */
export function renderTarjetas(horarios) {
    const contenedor = document.querySelector("#artist-list");
    contenedor.innerHTML = "";
    for (const horario of horarios) {
        contenedor.innerHTML += nuevaTarjeta(horario.artistaId, horario.dia, 
                                    horario.horaInicio, horario.escenarioId);
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
            <button>Añadir a mi plan</button>
        </div>
        `);
}

export function addFecha(fecha) {
    document.querySelector('#filter-day').innerHTML += (`
        <label>
            <input type="radio" name="day" value="${fecha}">
            ${fecha}
        </label>
        `);
}