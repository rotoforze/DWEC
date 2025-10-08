document.querySelectorAll(".card").forEach((curso) => {
    if (curso.querySelector(".categoria").textContent === `Desarrollo Web`){
        curso.classList.add('fondo-gris');
    } 
});