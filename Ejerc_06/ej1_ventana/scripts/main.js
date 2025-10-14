function alternarVistaSegunBoton(boton) {
    if (!boton) return;
    
    if (boton.parentNode.classList.contains('modal')) {
        boton.parentNode.style.display = boton.parentNode.style.display == 'none' ? 'block' : 'none';
    }else {
        boton.parentNode.querySelector('.modal').style.display = boton.parentNode.querySelector('.modal').style.display == 'none' ? 'block' : 'none';
    }
    
}
function ponerEventoAlternarABotones(botones) {
    if (!botones) return;
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            alternarVistaSegunBoton(boton);
        });
    });
}   

ponerEventoAlternarABotones(document.querySelectorAll('.mostarModal'));
ponerEventoAlternarABotones(document.querySelectorAll('.cerrar'));