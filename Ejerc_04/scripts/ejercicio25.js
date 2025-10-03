let cursosDAW = [];
document.querySelectorAll(".card").forEach((curso) => {
    if (curso.querySelector(".categoria").textContent === `Desarrollo Web`){
        cursosDAW.push(curso);
    } 
});
cursosDAW.map((curso) => {
    curso.style.backgroundColor = "#f0f0f0";
});