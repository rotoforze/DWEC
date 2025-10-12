document.querySelector('button').addEventListener('click', () => {
    // recogemos todos los li del documento
    let lista = Array.from(document.querySelectorAll("li"));
    // los ordenamos comparando a con b usando la funcion localCompare
    // la cual compara cadenas de texto
    lista.sort((a, b) => a.textContent.localeCompare(b.textContent));

    // cogemos el ul
    const ul = document.querySelector("ul");
    // lo vaciamos
    ul.innerHTML = "";
    
    for (const li of lista) {
        // por cada item de la lista, vamos añadiéndolo al ul
        ul.appendChild(li);  
    }
});