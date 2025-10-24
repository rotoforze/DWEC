const precios = {
    tamanios: {
        pequenia: 10,
        mediana: 12,
        grande: 15
    },
    extras: {
        queso: 1,
        peperoni: 1.5,
        champiniones: 0.75,
        pinia: 1
    },
    tipoMasa: {
        fina: 0,
        normal: 1,
        rellenaQueso: 2.5
    }
}
const plantillaPedido = {
    tamanio: undefined,
    extras: {
        queso: false,
        peperoni: false,
        champiniones: false,
        pinia: false
    },
    tipoMasa: undefined
};

function validar() {
    let nuevoPedido = plantillaPedido;

    const tamanio = document.pedido.tamanio.value;
    nuevoPedido.tamanio = tamanio;

    for (const extra of document.pedido.extra) {
        nuevoPedido.extras[extra.value] = extra.checked;
    }

    const masa = document.pedido.tipoMasa.value;
    nuevoPedido.tipoMasa = masa;

    total(nuevoPedido);
    
}

function total(pedido) {
    console.log(pedido)
    let total = 0;
    total += precios.tamanios[pedido.tamanio];
    for (const extra in pedido.extras) {
        if (pedido.extras[extra]) {
            total += precios.extras[extra]
        }
    }
    total += precios.tipoMasa[pedido.tipoMasa];
    document.querySelector('.total').textContent = total;
}