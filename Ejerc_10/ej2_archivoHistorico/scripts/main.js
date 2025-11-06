async function init() {
    modificarInterfaz('documento_ultimo.xml');
    document.querySelectorAll('button').forEach((boton) => boton.addEventListener('click', (e) => {
        modificarInterfaz(e.currentTarget.textContent);
    }));

}

async function modificarInterfaz(nuevoDocumento) {
    const datos = await pedirDatos(nuevoDocumento);
    const documentosProximos = cargarDatos(datos);
    const anteriorBoton = document.querySelector('.anterior');
    const siguienteBoton = document.querySelector('.siguiente');
    modificarBoton(anteriorBoton, documentosProximos[0]);
    modificarBoton(siguienteBoton, documentosProximos[1]);

    addHistorial(datos, nuevoDocumento);
}

function addHistorial(datos, nuevoDocumento) {
    if (!document.querySelector(`[archivo="${nuevoDocumento}"]`)) {
        document.querySelector('ul').innerHTML += `<li class='list-group-item list-group-item-action text-center text-muted' archivo='${nuevoDocumento}'>${datos.querySelector('titulo').textContent} - ${datos.querySelector('fecha').textContent}</li>`
    };

    const items = document.querySelectorAll('li');
    if (items.length === 0) {
        items[0].hidden = false;
    } else items[0].hidden = true;

    document.querySelectorAll('ul li').forEach((nuevaRuta) => nuevaRuta.addEventListener('click', (e) => {
        modificarInterfaz(e.currentTarget.getAttribute('archivo'));
    }));
    
}

function modificarBoton(boton, texto) {
    if (texto != "null") {
        boton.disabled = false;
        boton.textContent = texto;
    } else {
        boton.disabled = true;
        boton.textContent = '...';
    }
    return boton;
}

function cargarDatos(datos) {
    console.log(`%c Cargando datos...`, 'color: #a26060ff')
    const section = document.querySelector('section');
    section.innerHTML =
        `<div class="card shadow mx-auto my-4" style="max-width: 500px;">
    <div class="card-body text-center">
        <h2 class="card-title mb-3">${datos.querySelector('titulo').textContent}</h2>
        <p class="card-text text-muted">
            Documento <i>nº${datos.querySelector('id').textContent}</i> —
            Fecha: <b>${datos.querySelector('fecha').textContent}</b>
        </p>
        <img 
            class="img-fluid rounded mb-3 border"
            width="200"
            height="200"
            alt="Imagen: ${datos.querySelector('imagen').textContent}" 
            src="${datos.querySelector('imagen').textContent}"
        />
        <p class="card-text">${datos.querySelector('descripcion').textContent}</p>
    </div>
</div>`;
    ;
    return [datos.querySelector('anterior').textContent, datos.querySelector('siguiente').textContent];
}



// funcion del ej1 para pedir un documento
function pedirDatos(documento) {
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

document.addEventListener('DOMContentLoaded', init);