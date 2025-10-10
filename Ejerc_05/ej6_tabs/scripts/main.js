function crearBotones() {
    // recogo los contenedores que guardarán los botones y el que guarda las pestañas
    const contenedorBotones = document.querySelector('.botones');
    const pestanias = document.querySelectorAll('.seccion');
    // recorro cada pestaña
    pestanias.forEach((pestania, n) => {
        // a cada pestania, le añado un data-id con el número de la clave del itinerador
        pestania.setAttribute('data-id', n);
        // creo un botón nuevo
        const boton = document.createElement('input');
        // le pongo el tipo de boton
        boton.type = 'button';
        // le pongo un texto al botón para identificar que pestaña va a sacar. Para no poner
        // todo el texto, spliteo el string para coger solo la primera palabra de la frase.
        boton.value = `Mostrar sección ${pestania.textContent.split(" ")[0]}`;
        // añado evento de click, para que, primero oculte los que no estén ocultos y después desoculte el que necesitamos
        boton.addEventListener('click', () => {
            // recorro cada seccion mirando a ver si ésta contiene la clase oculto, si no la tiene, se la pone
            document.querySelectorAll('.seccion').forEach((boton) => {
                if (!boton.classList.contains('oculto')) {
                    boton.classList.toggle('oculto');
                }
            });
            // este botón encontrará la sección que le corresponde y le quitará la clase oculto
            document.querySelector(`[data-id="${n}"]`).classList.toggle('oculto');
        });
        // le meto el boton al contenedor de botones
        contenedorBotones.appendChild(boton);
    });
}
crearBotones();