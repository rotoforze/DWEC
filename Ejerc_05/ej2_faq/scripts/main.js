const preguntas = document.querySelectorAll("li h2");
preguntas.forEach((pregunta) => {
    pregunta.addEventListener("click", () => {
        revelarRespuesta(pregunta);
    });
});
function revelarRespuesta(elemento) {
    if (elemento.nextElementSibling.classList.contains('oculto')) {
        ocultarTodasLasRespuestas();
        elemento.nextElementSibling.classList.toggle('oculto');
    } else ocultarTodasLasRespuestas();
}
function ocultarTodasLasRespuestas() {
    preguntas.forEach((pregunta) => {
        if (!pregunta.nextElementSibling.classList.contains('oculto')) {
            pregunta.nextElementSibling.classList.toggle('oculto');
        }
    });
}