let isDrawing = false;
for (let i = 0; i<1600;i++) {
    let div = document.createElement('div');
    div.classList.add('dibujable');
    div.addEventListener('mousedown', () => isDrawing = true);
    div.addEventListener('mouseup', () => isDrawing = false);
    div.addEventListener('mouseover', () => {
        if (isDrawing) {
            div.style.backgroundColor = 'black'}
        }
    );
    document.querySelector('.contenedor').appendChild(div);
}