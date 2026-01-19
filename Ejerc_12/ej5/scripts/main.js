document.addEventListener('DOMContentLoaded', init);

let idIntervaloCarga;
let productos;
let pedidosConDetalles;
let pedidosSinDetalles;
let detallesPedidos;
let usuarios;


async function init() {
    animacionCarga();

    await sacarDatos();
    pedidosConDetalles = unirPedidos();

    for (const user of usuarios) {
        document.querySelector('#users').innerHTML += 
        `<option value="${user.id}">${user.nombre}</option>`;
    }

    document.querySelector('#users').addEventListener("input", (e) => mostrarDatos(e.target.value))

    if (mostrarDatos()) {
        clearInterval(idIntervaloCarga);
        document.querySelector('.pantallaCarga').style.display = 'none';
        document.querySelector('.container').hidden = false;
    }

}

async function sacarDatos() {
    try {
        await Promise.all([
            fetch("./data/productos.json").then(res => res.json()).then(data => productos = data),
            fetch("./data/pedidos.json").then(res => res.json()).then(data => pedidosSinDetalles = data),
            fetch("./data/detalles_pedido.json").then(res => res.json()).then(data => detallesPedidos = data),
            fetch("./data/usuarios.json").then(res => res.json()).then(data => usuarios = data)
        ]);
    } catch (error) {
        console.error(error);
    }
}

function unirPedidos() {
    return pedidosSinDetalles.map((pedido) => {
        const detallesDelPedido = []
        detallesPedidos.filter((detalle) => {
            if (detalle.pedidoId == pedido.id) {
                detallesDelPedido.push({
                    "cantidad": detalle.cantidad,
                    "precioUnitario": detalle.precioUnitario,
                    "producto": getNombreDelProducto(detalle.productoId)
                })
            };
        });

        const totalDelPedido = detallesDelPedido.reduce((acumulador, detalle) => {
            return acumulador + detalle.precioUnitario * detalle.cantidad
        }, 0);

        return {
            ...pedido,
            "detalles": detallesDelPedido,
            "totalDelPedido": totalDelPedido
        }
    });
}

function getNombreDelProducto(id) {
    for (const producto of productos) {
        if (producto.id == id) return producto.nombre;
    }
}

function mostrarDatos(userid) {
    document.querySelector('.container').innerHTML = "";
    for (const pedido of pedidosConDetalles) {
            if (pedido.usuarioId == userid || userid == undefined || userid == 'all') {
            let pedidoHTML = `
            <div class='card'>
            <h3>#${pedido.id} <i>${pedido.fecha}</i></h3>
            <p>Estado: ${pedido.estado}</p>
            <p>Total: <b>${pedido.totalDelPedido}</b> €</p>
            <hr>
            <ul>`;
            
            for (const detalles of pedido.detalles) {
                pedidoHTML += `<li>${detalles.cantidad} x ${detalles.producto} - ${detalles.precioUnitario} €</li>`;
            }
            
            document.querySelector('.container').innerHTML += pedidoHTML + `</ul> </div >`;
        }
    }
    return true;
}

function animacionCarga() {
    const textoCarga = document.querySelector('.puntosCarga');
    idIntervaloCarga = setInterval(() => {
        if (textoCarga.innerHTML.length < 3) {
            textoCarga.innerHTML += '.';
        } else {
            textoCarga.innerHTML = '';
        }
    }, 300)
}