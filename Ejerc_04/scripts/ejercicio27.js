let cursosAdmitidos = [];
document.querySelectorAll('.card').forEach((curso) => {
    if (!curso.classList.contains('.premium')) {
        cursosAdmitidos.push(curso);
    }
});
cursosAdmitidos.map((curso) => {
    curso.style.border = '2px dotted black';
});