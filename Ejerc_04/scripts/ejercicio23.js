const oculto = document.querySelector(".oculto");
oculto.parentElement.querySelector("h2").addEventListener('click', () => {
    oculto.className = "";
});