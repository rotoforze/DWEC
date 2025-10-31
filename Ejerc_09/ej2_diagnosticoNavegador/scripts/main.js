let ancho = window.screenX;
let alto = window.screenY;

function actualizar() {
    document.querySelector('.tamanioVentana').textContent = `${window.innerWidth} x ${window.innerHeight}`;
    document.querySelector('.tamanioVentanaTotal').textContent = `${window.outerWidth} x ${window.outerHeight}`;
    document.querySelector('.posicionVentana').textContent = `${ancho} x ${alto}`;
    document.querySelector('.resolucionVentana').textContent = `${screen.width} x ${screen.height}`;
    document.querySelector('.resolucionPantalla').textContent = `${screen.availWidth} x ${screen.availHeight}`;

    if (navigator.onLine) {
        document.querySelector('.conexion').style.backgroundColor = 'green';
    }else document.querySelector('.conexion').style.backgroundColor = 'red';
}

window.addEventListener('resize', actualizar);
window.addEventListener('online', actualizar);
window.addEventListener('offline', actualizar);

let intervalo;
if (!intervalo) {
    intervalo = setInterval(() => {
        if (!(window.screenX == ancho) || !(window.screenY == alto)) {
            ancho = window.screenX;
            alto = window.screenY;
            actualizar();
        }
    }, 250);
}

actualizar();