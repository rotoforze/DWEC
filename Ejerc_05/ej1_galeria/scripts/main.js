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
            // establecemos el atributo src por el de la miniatura del indice
            document.querySelector("#imagen-principal").setAttribute('src', miniatura.getAttribute('src'));
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
    // primero eliminamos a los elementos que tengan la clase resaltado la misma
    document.querySelectorAll(".resaltado").forEach((elemento) => elemento.classList.remove("resaltado"));
    
    // añadimos la clase resaltado a la indicada
    miniaturas[indice].classList.add("resaltado");
}

miniaturas.forEach((miniatura, indice) => {
    miniatura.addEventListener('click', () => {
        cambiarImagenPrincipal(indice);
        resaltarMiniatura(indice);
    });
});