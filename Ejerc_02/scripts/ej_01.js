let numeros = [];
for (let i = 0; i<6; i++) {
    numeros[i] = Math.floor(Math.random()*10+1);
};
console.table(numeros);

let dobles = numeros.map((numero) => {
    return numero * 2;
});
console.table(dobles);

let pares = [];
numeros.filter((numero) => {
    if (numero % 2 == 0) pares.push(numero);
});
for (const numero of pares) {
    console.log(numero);
}