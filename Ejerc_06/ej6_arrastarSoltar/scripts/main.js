const contenedorArrastrable = document.querySelector('.arrastrable');
// esta variable booleana me ayudará a saber si el arrastrable puede o no moverse
let puedeArrastrarse = false;

// si entra un click se pone en true, pero cuando liberamos el click, se pone en false
contenedorArrastrable.addEventListener('mousedown', () => {
    puedeArrastrarse = true;
});
contenedorArrastrable.addEventListener('mouseup', () => {
    puedeArrastrarse = false;
});

// guardamos el contenedor en una variable para no repetir mucho doc...
const contenedor = document.querySelector('.contenedor'); 
// cuando en el contenedor se mueve el raton vamos a comprobar si las coordenadas del
// arrastrable están dentro del mismo, además, si se salen vamos a poner en false
// la variable puedeArrastrarse y así evitamos que se salga del marco
contenedor.addEventListener('mousemove', () => { 
    // guardamos el alto y ancho del arrastrable para más sencillez en la lectura
    const altoArrastrable = contenedorArrastrable.getBoundingClientRect().height;
    const anchoArrastrable = contenedorArrastrable.getBoundingClientRect().width;

    // guardamos las coordenadas, que serán, la posición del raton menos el alto o ancho del arratrable entre dos, 
    // que esta sea el centro del contenedor arrastrable
    const yFinal = event.clientY - (altoArrastrable/2);
    const xFinal = event.clientX - (anchoArrastrable/2);
    
    // guardamos el alto y ancho del contenedor para sencillez de lectura
    const altoContenedor = contenedor.getBoundingClientRect().height;
    const anchoContenedor = contenedor.getBoundingClientRect().width;

    // comprobamos y guardamos si el arrastrable está dentro del contenedor
    const estaDentro = (yFinal < (altoContenedor-altoArrastrable) && (yFinal > -1)) && 
                        (xFinal < (anchoContenedor-anchoArrastrable) && (xFinal > -1));
    
    // si la anterior variable resolvió en false, ponemos puedeArrastrarse en false
    // para evitar que se pueda mover el cuadrado si estamos fuera del contenedor
    if (!estaDentro) puedeArrastrarse = false;

    // por último, si puede arrastrarse, le ponemos las nuevas coordenadas
    if (puedeArrastrarse) {
        contenedorArrastrable.style.top = `${yFinal}px`;
        contenedorArrastrable.style.left = `${xFinal}px`;
    }
});