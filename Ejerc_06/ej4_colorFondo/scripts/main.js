document.querySelector('#colores').addEventListener('click', (Event) => {
    document.querySelector('body').style.backgroundColor = Event.target.style.backgroundColor;
})