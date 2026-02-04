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
  let artista = { id: '', title: '', year: '' };

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
    title: request.body.title,
    year: request.body.year,
  };
  await save(artista);
  response.redirect(request.baseUrl);
}
