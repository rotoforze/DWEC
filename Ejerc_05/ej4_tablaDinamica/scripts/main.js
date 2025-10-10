const usuarios = [
    {
        nombre: 'Eneas',
        edad: 18,
        hola: true
    },
    {
        nombre: 'Cova',
        edad: 21
    },
    {
        nombre: 'Alex',
        edad: 22,
    },
    {
        nombre: 'Gonzalo',
        edad: 20
    },
    {
        nombre: 'Adrián',
        edad: 21
    }
];
function mostrarUsuarios(listaUsuarios) {
    // creamos un docFragment
    let fragment = new DocumentFragment();
    
    // en este set vamos a guardar cada valor que haya en el array de objetos
    let campos = new Set();

    // itineramos sobre la lista de usuarios para crear un tr por cada usuario con un td dentro por cada valor 
    listaUsuarios.forEach((usuario) => {
        // guardamos la información de este usuario
        let informacion = [];
        // iteramos sobre sus valores, para guardarlos arriba
        for (const valor in usuario) {
            // intentamos añadir este campo, si existe lo ignora porque ya existe
            campos.add(valor);
            // añadimos a información un elemento td con cada valor del usuario
            informacion.push(crearColumna(usuario[valor]));
        }
        // añadimos a la tabla la fila con la información de este usuario
        fragment.appendChild(crearFila(informacion));
    });

    // convertimos cada valor de los posibles campos de los usuarios en td y los guardo en un array
    const columnasCampos = []; 
    campos.forEach(key => {
        // se crea un td y se mete al array
        columnasCampos.push(crearColumna(key));
    });
    // antes del primer elemento de la tabla, meto los campos
    fragment.insertBefore(crearFila(columnasCampos), fragment.firstChild); 
    
    // creamos la tabla
    const tabla = document.createElement('table');
    // le metemos el contenido del documentFragment
    tabla.appendChild(fragment);
    // metemos la tabla en el contenedor
    document.querySelector("#contenedor-tabla").appendChild(tabla);
}

// esta función recibe un array de td y devuelve un tr que contiene todos los td del array
function crearFila(columnas) {
    // crea el elemento de la fila
    const fila = document.createElement('tr');
    // itera sobre las columnas, para ir añadiendo cada una al tr
    for (const columna of columnas) {
        fila.appendChild(columna);
    }
    // devuelve el tr
    return fila;
}

// esta función recibe un string y devuelve un td que contiene el string
function crearColumna(valor) {
    // creamos el td
    const columna = document.createElement('td');
    // añadimos el valor al td
    columna.textContent = valor;
    // lo devolvemos
    return columna;
}
mostrarUsuarios(usuarios);