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
        <div class="grid-container">
            <h3>${getArtista(artistaId).nombre}</h3>
            <p>${getArtista(artistaId).genero} - ${getArtista(artistaId).pais}</p>
            <div>
                <h5>${dia} a las ${horaInicio}</h5>
                <p>${getEscenario(escenarioId).nombre}</p>
            </div>
            <button>Añadir a mi plan</button>
        </div>
        `)
}