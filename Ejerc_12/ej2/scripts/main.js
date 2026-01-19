document.addEventListener('DOMContentLoaded', init);

function init() {
    // validar datos y añadir el evento al boton
    document.querySelector(`form`).addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = document.querySelector('#correo').value;
        mostrarDatos(await buscarDatos(correo));
    });
}

function mostrarDatos(datos) {
    const contenedor = document.querySelector('div');
    contenedor.innerHTML = `
        <fieldset>
            <legend><i>${datos.user.email}</i></legend>
            <p>Nombre: <b>${datos.user.nombre}</b></p>
            <p>Fecha de registro: ${datos.user.fechaRegistro}</p>
        </fieldset>`;
    if (datos.pedidos < 1) contenedor.innerHTML += '<h1>No hay pedidos.</h1>';
    for (const pedido of datos.pedidos) {
        contenedor.innerHTML += ` 
            <div class="pedidos">
                <p>ID: ${pedido.id}</p>
                <p>Fecha: ${pedido.fecha}</p>
                <p>Estado: ${pedido.estado}</p>
            </div>`;
    }
}

async function buscarDatos(correo) {
    if (validarDatos(correo)) {
        let userInfo;
        if (userInfo = await existeUsuario(correo)) {

            let pedidos = await getPedidos();
            pedidos = pedidos.filter((pedido) => {
                if (pedido.usuarioId == userInfo.id) {
                    return pedido;
                }
            });
            return { "user": userInfo, "pedidos": pedidos };
        } else window.alert('usuario no encontrado');
    } else window.alert('correo inválido');
}

async function getPedidos() {
    return new Promise((resolve, reject) => {
        fetch('./data/pedidos.json')
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch(error => reject(error));
    });
}

function validarDatos(correo) {
    return correo.includes('@') || correo.lenght < 1;
}

async function existeUsuario(correo) {
    const users = await getUsers();
    return users.find((user) => {
        if (user.email == correo) return user;
    })
}

async function getUsers() {
    return new Promise((resolve, reject) => {
        fetch('./data/usuarios.json')
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch(error => reject(error));
    });
}