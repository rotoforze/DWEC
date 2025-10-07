const oculto = document.querySelector(".oculto");
oculto.parentElement.querySelector("h2").addEventListener('click', () => {
    if (oculto.classList == "oculto") {
        oculto.className = ""; // vacio
    }else oculto.className = "oculto";
});