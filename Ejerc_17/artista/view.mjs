export function render(artistas) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>artista list</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <a href="/artista/form">Añadir nuevo Artista</a>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Pais</th>
        <th>Genero</th>
        <th>Fecha de formación</th>
        <th>Acciones</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${artistas
      .map(
        (artista) => `
        <tr>
          <td><img width="50px" src="${artista.foto}"/></td>
          <td>${artista.nombre}</td>
          <td>${artista.pais}</td>
          <td>${artista.genero}</td>
          <td>${artista.fecha_formacion}</td>
          <td><a class="edit" href="/artista/form/${artista.id}">edit</a></td> 
          <td><a class="delete" href="/artista/delete/${artista.id}">delete</a></td>
        </tr>`
      )
      .join('')}
    </tbody>
  </table>
</body>
</html>
  `;
}
