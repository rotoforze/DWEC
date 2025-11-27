let preguntas;
let resolucion = [];
let preguntaActual = 0;
function init() {
    cambiarTextoAlBoton("Cargando!");
    fetch('./data/questions.json')
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            document.querySelector(".error-conexion").hidden = true;
            preguntas = resultado;
            // una vez ha cargado
            cambiarTextoAlBoton("Iniciar quiz");
            document.querySelector('button').addEventListener('click', iniciarQuiz);
        })
        .catch((error) => {
            document.querySelector(".error-conexion").hidden = false;
            cambiarTextoAlBoton("error");
            console.error(error);
        });
}

function cambiarTextoAlBoton(texto) {
    document.querySelector('button').textContent = texto;
}

function iniciarQuiz() {
    document.querySelector('button').removeEventListener('click', iniciarQuiz);
    pintarPregunta(preguntaActual);
}

function pintarPregunta(num) {
    const datos = preguntas[num];
    const boton = document.querySelector("button");
    boton.disabled = true;

    // ponemos el id de la preugnta y su texto
    const elementoPregunta = document.querySelector('.pregunta');
    elementoPregunta.hidden = false;
    elementoPregunta.setAttribute('data-id', datos.questionId);
    elementoPregunta.textContent = `${datos.questionId}: ${datos.text}`;

    // ponemos una serie de inputs para cada respuesta
    document.querySelector('.respuestas').hidden = false;
    document.querySelector('.respuestas').innerHTML = "";
    
    for (const respuesta of datos.options) {
        document.querySelector('.respuestas').innerHTML += (`
                <input type="radio" name="respuesta" 
                data-choice="${respuesta.id}" id="respuesta-button">
                ${respuesta.id} ) ${respuesta.text}</input><br>
            `);
    }
    if (preguntaActual == preguntas.lenght) {
        cambiarTextoAlBoton("Finalizar");
    }else cambiarTextoAlBoton("Siguiente");

    // pongo los eventos a resolver
    document.querySelectorAll("#respuesta-button").forEach((elemento) => {
        elemento.addEventListener('input', () => {
            // activamos el boton de siguiente
            boton.disabled = false;
            boton.addEventListener("click", () => {
                const newBtn = boton.cloneNode();
                boton.replaceWith(newBtn);
                resolver(elemento.getAttribute("data-choice"));
            });
        });
    });

    document.querySelector("#results-summary").hidden = false;
    document.querySelector("#results-summary").textContent = `${getAciertos()}/${preguntas.length}`;
}

function resolver(data) {
    if (data === preguntas[preguntaActual].correctAnswer) {
        resolucion[preguntaActual] = true;
    }else {
        resolucion[preguntaActual] = false;
    }
    // siguiente pregunta
    if (resolucion.length < preguntas.length) {
        preguntaActual++;
        pintarPregunta(preguntaActual);
    }else {
        terminarQuiz();
    }
}

function getAciertos() {
    let aciertos = 0;
    resolucion.forEach(pregunta => {
        if (pregunta) aciertos++;
    });
    return aciertos;
}

function terminarQuiz() {
    document.querySelector(".pregunta").hidden = true;
    document.querySelector(".respuestas").hidden = true;
    document.querySelector("button").hidden = true;
    document.querySelector("#results-summary").innerHTML = (`
        <div>Aciertos: ${getAciertos()}/${preguntas.length}</div>
        <hr>
        `);
    preguntas.forEach((elemento) => {
        document.querySelector("#results-summary").innerHTML += (`
            <details>
                <summary>${elemento.questionId}: ${elemento.text}</summary>
                <h3>Correcta: ${elemento.correctAnswer}</h3>
                <p>${elemento.explanation}</p>
            </details>
            `);
    })
}


document.addEventListener('DOMContentLoaded', init);