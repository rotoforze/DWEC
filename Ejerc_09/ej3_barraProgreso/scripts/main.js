const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;

const barra = document.querySelector('.barra');
barra.max = alturaTotal;

const volver = document.querySelector('.volver');
window.addEventListener('scroll', recalcular);

volver.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

function recalcular() {
    const posicionActual = Number.parseInt(window.scrollY);
    barra.value = posicionActual;
    console.log(Number.parseInt(window.scrollY) > window.innerHeight, Number.parseInt(window.scrollY), window.innerHeight)
    if (Number.parseInt(window.scrollY) > window.innerHeight) {
        volver.classList.add('invisible');
    }else volver.classList.remove('invisible');
}