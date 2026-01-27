document.addEventListener('DOMContentLoaded', init);

async function init() {
    const jsonContent = await fethcData();
    const jsonParsed = parseJSON(jsonContent);
    parseJSONToHTML(jsonParsed);
    contadorDias();
}

async function fethcData() {
    return new Promise((resolve, reject) => {
        fetch('./data/eventos.json')
            .then((json) => resolve(json.json()))
            .catch(e => reject(e));
    });
}

function parseJSON(json) {
    for (const item of json) {
        // si es un objeto, lo parseamos para coger el año, mes y dia
        if (typeof item.fecha == "object") {
            item.fecha = new Date(item.fecha.año, item.fecha.mes, item.fecha.dia);
        } else {
            item.fecha = new Date(item.fecha);
        }
    }
    return json;
}

function parseJSONToHTML(json) {
    const contenedor = document.querySelector('.contenedor');
    for (const item of json) {
        contenedor.innerHTML += `
        <div class="evento">
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <p>
                <b>Fecha: </b>
                <span>${new Date(item.fecha).toLocaleDateString()}</span>
            </p>
            <div class="contador activo" data-time="${item.fecha}"></div>
            <input type="number" placeholder="Días a sumar" min='0'>
            <button>Posponer</button>
        </div>
        `;
    }
    document.querySelectorAll('.evento button').forEach((button) => {
        button.addEventListener('click', () => {

            const input = button.previousElementSibling; // el input con el número de días
            const contador = input.previousElementSibling; // el div .contador
            const spanFecha = contador.previousElementSibling.querySelector('span'); // el span de la fecha

            const diasASumar = Number(input.value);
            const fechaActual = new Date(contador.getAttribute('data-time'));

            // suma los dias
            fechaActual.setDate(fechaActual.getDate() + diasASumar);

            // actualiza el attribute
            contador.setAttribute('data-time', fechaActual.toISOString());

            // actualiza el psan
            spanFecha.textContent =
                `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

            // limpio el input
            input.value = '';
        });
    });


}

async function contadorDias() {
    let intervalId = setInterval(() => {
        document.querySelectorAll('.contador.activo').forEach((div) => {

            const fecha = new Date(div.getAttribute('data-time')).getTime();
            const ahora = Date.now();

            let diferencia = fecha - ahora;

            // Si ya pasó la fecha muestro "finalizado"
            if (diferencia <= 0) {
                div.textContent = "finalizado";
                div.classList.remove('contador', 'activo');
                div.classList.add('contador', 'inactivo');
                return;
            }

            // convierto la diff a unidad de seg
            const segundosTotales = Math.floor(diferencia / 1000);

            const dias = Math.floor(segundosTotales / (60 * 60 * 24));
            const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / 3600);
            const minutos = Math.floor((segundosTotales % 3600) / 60);
            const segundos = segundosTotales % 60;

            // muestro el resultado
            div.textContent = `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
        });
    }, 1000);

}