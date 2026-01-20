document.addEventListener('DOMContentLoaded', init);
let imagenesModificadas;

function init() {
    document.querySelector('[type="file"]').addEventListener('input', (e) => {
        previewImagenes(e.target.files);
    });
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const files = document.querySelector('[type="file"]').files;
        const marcaDeAgua = document.querySelector('#marcaAgua').value;
        const ancho = document.querySelector('#ancho').value;
        const formato = document.querySelector('#formato').value;
        imagenesModificadas = modificarImagenes(files, marcaDeAgua, Number.parseInt(ancho), formato);
    })
}

function previewImagenes(files) {
    document.querySelector('[type="submit"]').disabled = true;
    for (const file of files) {
        const reader = new FileReader();
        if (file.type.match('image.*')) {
            reader.onload = (e) => {
                document.querySelector('[type="submit"]').disabled = false;
                const contenedor = document.querySelector('.preview');
                contenedor.innerHTML += `<img class='thumbnail' src="${reader.result}" />`
            }
            reader.readAsDataURL(file);
        } else {
            reader.readAsDataURL(file);
            window.alert(reader.result + ' no es una imagen');
            break;
        }
    }
}

function modificarImagenes(imagenes, marcaDeAgua = null, ancho = 0, formato) {
    console.log(imagenes, marcaDeAgua, ancho, formato);
    formato = formato.toLowerCase();
    document.querySelector('.descarga').innerHTML = '';
    let imgADevolver = [];
    for (const file of imagenes) {
        const reader = new FileReader();
        if (file.type.match('image.*')) {
            reader.onload = (e) => {
                // modifico las imagenes
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const img = new Image();
                img.src = reader.result;

                img.onload = () => {
                    canvas.width = ancho > 0 ? ancho : img.width;
                    canvas.height = ancho > 0 ? ancho : img.height;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    if (marcaDeAgua) {
                        const porcentaje = 200
                        ctx.font = `${ancho > 0 ? ancho / 100 * porcentaje : img.width / 100 * porcentaje} Arial`;
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                        ctx.textAlign = 'center';

                        ctx.fillText(marcaDeAgua, canvas.width / 2, canvas.height - 20);
                    }

                    

                    canvas.toBlob((blob) => {
                        const urlDescarga = URL.createObjectURL(blob);
                        const reader = new FileReader();

                        reader.onload = (event) => {
                            const url = event.target.result;

                            document.querySelector('.descarga').innerHTML += `
                                        <a href="${urlDescarga}" download="editada-${file.name}">${file.name}</a>
                                        <img src="${url}" class="thumbnail"/>
                                    `;
                        };

                        reader.readAsDataURL(blob);
                    }, 'image/' + (formato == "JPG" || formato == "PNG" ? formato : "webp"), 0.9);



                }

                imgADevolver.push();
            }
            reader.readAsDataURL(file);
        } else {
            reader.readAsDataURL(file);
            window.alert(reader.result + ' no es una imagen');
            break;
        }
    }
}