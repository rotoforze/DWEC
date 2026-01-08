function renderTarjetas() {

}

function nuevaTarjeta () {
    return (`
        <div>
            <h3>${artista.nombre}</h3>
            <p>${artista.genero} - ${artista.pais}</p>
            <div>
                <h5>${horario.dia} a las ${horario.horaInicio}</h5>
                <p>${escenario.nombre}</p>
            </div>
            <button>Añadir a mi plan</button>
        </div>
        `)
}