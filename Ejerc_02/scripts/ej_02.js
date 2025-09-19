function calcularAreaRectanculo(base, altura) {
    return base*altura;
}
console.log(calcularAreaRectanculo(2,4));

// const calcularAreaTriangulo = function(base, altura) { return (base*altura)/2 };
// console.log(calcularAreaTriangulo(2, 4));

// calcular area triangulo como arrow function 
// const calcularAreaTriangulo = (base, altura) => (base*altura)/2 ;
// console.log(calcularAreaTriangulo(2, 4));

// Funcion anterior con valores por defecto 
const calcularAreaTriangulo = (base = 2, altura = 4) => (base*altura)/2 ;
console.log(calcularAreaTriangulo());