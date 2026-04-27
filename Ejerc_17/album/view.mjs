import {get as getJSON} from '../artista/models.mjs';

export async function render(albumes) {
    const filas = await Promise.all(albumes.map(async (album) => {
        const artista = await getJSON(album.artistaId);

        return `
    <tr>
      <td><img width="50px" src="${album.foto}"/></td>
      <td>${album.titulo}</td>
      <td>${album.anio}</td>
      <td>
        <a href="/artista/detalle/${album.artistaId}">
          ${artista?.nombre ?? 'Desconocido'}
        </a>
      </td>
      <td><a class="edit" href="/album/form/${album.id}">edit</a></td> 
      <td><a class="delete" href="/album/delete/${album.id}">delete</a></td>
    </tr>`;
    }));

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>album list</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>
  <a href="/album/form">Añadir nuevo album</a>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Titulo</th>
        <th>Año</th>
        <th>Artista</th>
        <th>Acciones</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${filas.join('')}
          </tbody>
  </table>
</body>
</html>
  `;
}