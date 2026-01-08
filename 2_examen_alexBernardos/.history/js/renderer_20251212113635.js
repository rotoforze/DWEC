import { getArtista, getEscenario } from "./dataManager.js";

export function renderTarjetas(horarios) {
    const contenedor = document.querySelector("#artist-list");
    contenedor.innerHTML = "";
    for (const horario of horarios) {
        contenedor.innerHTML += nuevaTarjeta(horario.artistaId, horario.dia, 
                                    horario.horaInicio, horario.escenarioId);
    }
}

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
        `)
}