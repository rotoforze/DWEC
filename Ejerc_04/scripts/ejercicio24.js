document.querySelectorAll("h2").forEach((cabecera) => {
    if (cabecera.parentElement.parentElement.classList.contains("card")) {
        cabecera.textContent = `[CURSO] ${cabecera.textContent}`
    }
});