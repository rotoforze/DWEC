document.addEventListener('DOMContentLoaded', init);
let idIntervaloCarga;
async function init() {
    animacionCarga()

    if (false) {
        clearInterval(idIntervaloCarga);
        document.querySelector('.pantallaCarga').style.display = 'none';
        document.querySelector('.app').hidden = false;
    }

}

function animacionCarga() {
    const textoCarga = document.querySelector('.puntosCarga');
    idIntervaloCarga = setInterval(() => {
        if (textoCarga.innerHTML.length < 3) {
            textoCarga.innerHTML += '.';
        } else {
            textoCarga.innerHTML = '';
        }
    }, 300)
}