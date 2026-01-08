function renderTarjetas(horarios) {
    
}

function nuevaTarjeta (artistaId, dia, horaInicio, escenarioId) {
    return (`
        <div>
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