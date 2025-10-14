document.querySelectorAll('.mostarModal').forEach((boton) => {
    boton.addEventListener('click', () => {
        boton.nextElementSibling.style.display = 'block';
    });
});
document.querySelectorAll('.cerrar').forEach((boton) => {
    boton.addEventListener('click', () => {
        boton.parentElement.style.display = 'none';
    });
});