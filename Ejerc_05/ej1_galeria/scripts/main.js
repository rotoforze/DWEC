// querySelectorAll guarda todas las ocurrencias en un nodeList
const miniaturas = document.querySelectorAll(".miniatura");

function cambiarImagenPrincipal(indice) {
    /* protegemos la función para que solo funcione si la 
    variable indice se ha inicializado y además, 
    el indice no excede la longitud de las miniaturas */

    if ((indice || indice==0) && miniaturas.length >= indice) {
        const miniatura = miniaturas[indice];
        
        // comprobamos si existe la miniatura
        if (miniatura) {
            const nuevaMiniatura = miniatura.getAttribute('src');
            miniatura.setAttribute('src', document.querySelector("#imagen-principal").getAttribute('src'));
            // establecemos el atributo src por el de la miniatura del indice
            document.querySelector("#imagen-principal").setAttribute('src', nuevaMiniatura);
            // lo resaltamos para indicar visualmente cual es
            resaltarMiniatura(indice);
            console.info(`Se ha cambiado la imagen por la de ${indice}`)
        }else {
            console.warn(`No hay un elemento válido en ${indice}`);
        }
    } else {
        console.warn(`${indice} no se ha iniciado`);
    }
    return null;
}

function resaltarMiniatura(indice) {
    // primero eliminamos a los elementos que tengan la clase activa la misma
    document.querySelectorAll(".activa").forEach((elemento) => elemento.classList.remove("activa"));
    
    // añadimos la clase activa a la indicada
    miniaturas[indice].classList.add("activa");
}

miniaturas.forEach((miniatura, indice) => {
    miniatura.addEventListener('click', () => cambiarImagenPrincipal(indice));
});