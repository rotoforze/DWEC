document.querySelectorAll(".card").forEach((curso) => {
    let parrafo = document.createElement("p");
    parrafo.classList.add = 'duracion';
    parrafo.textContent = 'Duración: 20 horas';
    curso.querySelector(".info").appendChild(parrafo);
});