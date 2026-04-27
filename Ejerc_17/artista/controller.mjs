import { getAll, remove, get, save } from './models.mjs';
import { getArtistAlbum as getAlbums } from "../album/models.mjs";
import { render } from './view.mjs';
import { render as form } from './form.mjs';

export async function listAction(request, response) {
  const data = await getAll();
  const body = render(data);
  response.send(body);
}

export async function removeAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}

export async function formAction(request, response) {
  let artista = { id: '', nombre: '', pais: '', genero: '', fecha_formacion: '', foto: '' };

  if (request.params.id) {
    artista = await get(parseInt(request.params.id, 10));
  }

  const body = form(artista);
  response.send(body);
}

export async function saveAction(request, response) {
  const artista = {
    id: request.body.id,
    nombre: request.body.nombre,
    pais: request.body.pais,
    genero: request.body.genero,
    fecha_formacion: request.body.fecha_formacion,
    foto: request.body.foto,
  };
  await save(artista);
  response.redirect(request.baseUrl);
}

export async function detalleAction(request, response) {
  const id = parseInt(request.params.id, 10);
  const artista = await get(id);
  const albumesArtista = await getAlbums(artista.id);
  console.log(albumesArtista);

  const body = `
  <html>
  <head>
  <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>

  <h1>${artista.nombre}</h1>

  <img src="${artista.foto || 'https://via.placeholder.com/150'}" width="150">

  <p>Pais: ${artista.pais}</p>
  <p>Genero: ${artista.genero}</p>
  <p>Año formación: ${artista.fecha_formacion}</p>

  <h2>Álbumes</h2>

  <ul>
    ${albumesArtista.map(album => `
      <li>
        <img src="${album.foto || 'https://via.placeholder.com/50'}" width="50">
        ${album.titulo} (${album.anio})
      </li>
    `).join("")}
  </ul>

  <a href="/artista">volver</a>

  </body>
  </html>
  `;

  response.send(body);
}

export async function getJSON(request, response) {
  const artista = await get(parseInt(request.params.id));
  response.json(artista ||   {
    "id": -1,
    "nombre": "No encontrado",
    "pais": "No encontrado",
    "genero": "No encontrado",
    "fecha_formacion": -1,
    "foto": undefined
  });
}