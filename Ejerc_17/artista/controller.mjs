import { getAll, remove, get, save } from './models.mjs';
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

  console.log(artista);

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
