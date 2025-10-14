document.querySelectorAll('#color').forEach((color) => {
    color.addEventListener('click', () => {
        document.querySelector('body').style.backgroundColor = color.style.backgroundColor;
    });
});