import { getAll, remove, get, save } from './models.mjs';
import { render } from './view.mjs';
import { render as form } from './form.mjs';

export async function listAction(request, response) {
  const data = await getAll();
  const body = await render(data);
  response.send(body);
}

export async function removeAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}

export async function formAction(request, response) {
  let album = { id: '', titulo: '', anio: '', artistaId: '', foto: '' };

  if (request.params.id) {
    album = await get(parseInt(request.params.id, 10));
  }

  const body = form(album);
  response.send(body);
}

export async function saveAction(request, response) {
  const album = {
    id: request.body.id,
    titulo: request.body.titulo,
    anio: request.body.anio,
    artistaId: request.body.artistaId,
    foto: request.body.foto,
  };
  await save(album);
  response.redirect(request.baseUrl);
}
