async function pedirDatos(documento) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.onload = () => {
            if (peticion.status == 200) {
                console.log(`%c Datos recibidos en ${documento}`, 'color: #87e833ff');
                resolve(peticion.response);
            } else if (peticion.status == 404) {
                console.log(`%c El archivo ${documento} no se ha encontrado.`, 'color: #ff3434ff');
                window.alert(`No se ha encontrado el archivo ${documento}`);
                reject;
            } else {
                console.log(`%c Error en la petición.`, 'color: #ff3434ff');
                reject;
            }
        };
        peticion.onerror = reject;
        peticion.open('GET', `./datos/${documento}`);
        peticion.responseType = 'document';
        peticion.setRequestHeader('Accept', 'text/html');
        peticion.send();
    });
}

async function init() {
    // primera parte del ejercicio
    const peticionSoporteVital = await pedirDatos('soporte_vital.xml');
    
    // cojo todas las mediciones
    const mediciones = peticionSoporteVital.querySelectorAll('medicion');

    // busco la medición más reciente
    let ultimaMedicion;
    for (const medicionActual of mediciones) {
        if (ultimaMedicion) {
            if (new Date(medicionActual.getAttribute('timestamp')) > new Date(ultimaMedicion.getAttribute('timestamp'))) {
                ultimaMedicion = medicionActual;
            }
        } else ultimaMedicion = medicionActual;
    }
    // añado los datos de la ultima medicion al html
    document.querySelector('.fecha').innerHTML = ultimaMedicion.getAttribute('timestamp');
    document.querySelector('.oxigeno').innerHTML = ultimaMedicion.querySelector('oxigeno').textContent;
    document.querySelector('.temperatura').innerHTML = ultimaMedicion.querySelector('temperatura').textContent;
    document.querySelector('.presion').innerHTML = ultimaMedicion.querySelector('presion').textContent;


    // segunda parte del ejercicio
    const peticionInventario = await pedirDatos('inventario.xml');
    
    const items = peticionInventario.querySelectorAll('item');
    const select = document.querySelector('select');
    for (const itemActual of items) {

        // lo meto a la lista
        const option = document.createElement('option');
        option.textContent = itemActual.querySelector('nombre').textContent;
        option.value = itemActual.querySelector('nombre').textContent;
        option.setAttribute('cantidad', itemActual.querySelector('cantidad').textContent);
        option.setAttribute('consumo', itemActual.querySelector('consumo').textContent);
        option.setAttribute('unidad', itemActual.getAttribute('unidad'));
        select.appendChild(option);
    }
    select.addEventListener('input', (item) => {
        if (item.currentTarget.selectedIndex === 0) return;
        document.querySelector('.cantidad').textContent = select[item.currentTarget.selectedIndex].getAttribute('cantidad');
        document.querySelector('.unidad').textContent = select[item.currentTarget.selectedIndex].getAttribute('unidad');
    });
}

export function calcularAutonomia() {
    console.log('%c Calculando autonomía...', 'color: #a26060ff');
    const select = document.querySelector('select');
    if (select.selectedIndex == 0) return;
    const item = select[select.selectedIndex];
    const cantidadTripulantes = 4;
    const consumo = item.getAttribute('consumo') * cantidadTripulantes;
    const duracion =  Number.parseInt(item.getAttribute('cantidad') / consumo);
    document.querySelector('.nombre').textContent = item.textContent;
    document.querySelector('.dias').textContent = duracion;
}

document.querySelector('button').addEventListener('click', calcularAutonomia)

document.addEventListener('DOMContentLoaded', init);