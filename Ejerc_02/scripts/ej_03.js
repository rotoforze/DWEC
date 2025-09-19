function retirarDinero(saldo, retirar, tieneTarjetaCredito) {
    if (saldo >= retirar) {
        console.log(`Retiro exitoso. Saldo restante [${saldo-retirar}]`)
    }else if (tieneTarjetaCredito){
        console.log(`Saldo insuficiente. Abonado con tarjeta de crédito. Saldo restante [${saldo-retirar}]`)
    } else console.log(`Saldo insuficiente.`)
}
retirarDinero(100, 112, true);