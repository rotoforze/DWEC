document.querySelectorAll('.card').forEach((curso) => {
    if (!curso.classList.contains('premium')) {
        curso.classList.add('borde-negro-punteado');
    }
});