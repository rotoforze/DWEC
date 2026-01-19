document.addEventListener('DOMContentLoaded', init);
let okCounter = new Set();
function init() {
    // nombre
    document.querySelector('#nombre').addEventListener('blur', () => {
        messageController('sku', 'checking');
        if (document.querySelector('#nombre').value.length < 1) {
            messageController('nombre', 'error', 'Longitud mínima 1');
        } else messageController('nombre', 'ok');
    });
    // sku 
    document.querySelector('#sku').addEventListener('blur', async () => {
        messageController('sku', 'checking');
        if (document.querySelector('#sku').value.length < 5) {
            messageController('sku', 'error', 'Valor mínimo 5');
        } else if (await existeSku(document.querySelector('#sku').value)) {
            console.log(0)
            messageController('sku', 'error', 'SKU ya existe');
        } else messageController('sku', 'ok');
    });
    // precio
    document.querySelector('#precio').addEventListener('blur', () => {
        messageController('precio', 'checking');
        if (Number.parseFloat(document.querySelector('#precio').value) < 0 || document.querySelector('#precio').value == "") {
            messageController('precio', 'error', 'Valor mínimo 0.01');
        } else messageController('precio', 'ok');
    });
    // stock
    document.querySelector('#stock').addEventListener('blur', () => {
        messageController('stock', 'checking');
        if (Number.parseInt(document.querySelector('#stock').value) < 1 || document.querySelector('#stock').value == "") {
            messageController('stock', 'error', 'Valor mínimo 1');
        } else messageController('stock', 'ok');
    });
    // categoria
    document.querySelector('#categoria').addEventListener('blur', () => {
        messageController('categoria', 'checking');
        if (document.querySelector('#categoria').value.length < 1) {
            messageController('categoria', 'error', 'Longitud mínima 1');
        } else messageController('categoria', 'ok');
    });
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        document.querySelector('.mensajes').innerHTML += `
            <p styles="color: green;">${document.querySelector('#nombre').value} guardado</p>
        `;
        document.querySelector('#nombre').value = "";
        document.querySelector('#sku').value = "";
        document.querySelector('#precio').value = "";
        document.querySelector('#stock').value = "";
        document.querySelector('#categoria').value = "";
        
        document.querySelectorAll('i').forEach(i => {
            i.remove();
        });

        okCounter = new Set();

        document.querySelector('[value="enviar"]').disabled = true;
    })
}

function messageController(tag, state, errorMensage) {
    if (document.querySelector(`[for="${tag}"] i`)) {
        document.querySelector(`[for="${tag}"] i`).remove();
    }
    switch (state) {
        case 'error':
            document.querySelector(`[for="${tag}"]`).innerHTML += `
            <i style="color:red;">${errorMensage}</i>
            `;
            if (okCounter.length > 0) okCounter.delete(tag);
            document.querySelector('[value="enviar"]').disabled = true;
            break;
        case 'checking':
            document.querySelector(`[for="${tag}"]`).innerHTML += `
            <i style="color:gray;">Comprobando ${tag}...</i>
            `;
            break;
        case 'ok':
            document.querySelector(`[for="${tag}"]`).innerHTML += `
            <i style="color:green;">Ok</i>
            `;
            if (okCounter.size < 5) {
                okCounter.add(tag);
            }
            if (okCounter.size == 5) document.querySelector('[value="enviar"]').disabled = false;
            break;
    }
}

async function existeSku(id) {
    const productos = await fetch('./data/productos.json')
        .then(res => res)
        .then(data => data.json())
        .catch(err => console.error(err));
    for (const producto of productos) {
        if (producto.sku == id.toUpperCase()) return true;
    }
    return false;
}