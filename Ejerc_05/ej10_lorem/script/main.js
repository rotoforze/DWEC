const lorems = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at aliquam aliquid dicta odio nemo, illo architecto nesciunt aperiam ipsum excepturi vel esse alias? Voluptas non aspernatur excepturi alias dolores.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illum maiores, culpa maxime perspiciatis perferendis magnam iste ea dolorum exercitationem consequuntur velit excepturi? Nulla rem nihil voluptatem tempora quibusdam fugit!',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vero! Praesentium eius sequi doloribus eaque est dicta laboriosam, ipsa, assumenda at debitis voluptatibus placeat aut repudiandae quos ad dolores eos!',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi laudantium corrupti aspernatur aperiam alias animi facilis perferendis optio nesciunt et iusto ullam, distinctio vitae incidunt ut sed neque suscipit deleniti!',    
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eveniet voluptatibus doloremque quo aliquid molestias velit quia dolore. Fugiat voluptatum voluptatem suscipit recusandae quaerat consequuntur repellendus hic magni! Culpa, enim.',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora deserunt cupiditate quibusdam laudantium accusantium magnam fugiat beatae delectus recusandae a ratione asperiores, eligendi labore, dolor facilis doloribus, ipsam expedita sed',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero blanditiis, dolorem magni enim harum aliquam deserunt! Totam at, molestiae alias sapiente sint molestias porro quae, quaerat id, dolores quod fugiat!',
    'Officia modi consequuntur numquam facere incidunt perferendis tempore nihil autem unde, aliquid doloribus quibusdam sunt iste recusandae inventore hic nesciunt tenetur illo eligendi itaque eveniet culpa sed ut! Porro, labore.',
    'Amet perspiciatis odio est totam rem itaque ex eius quas quam laborum sint dicta voluptatum beatae, at odit tempore, cumque modi voluptatibus, laudantium magnam. Provident perferendis cum nemo eos voluptatem.',
    'Consequuntur dolores accusantium itaque, officiis harum dolor maiores molestias fuga fugit, beatae placeat animi sed nihil. Cum omnis quam commodi delectus! Iusto eveniet voluptate consectetur? Ipsum, magnam corrupti? At, repellat!',
    'Recusandae quibusdam odit, pariatur porro impedit explicabo eius ipsa harum ipsum sint dolor cumque tempora, dolorem ad velit error nihil qui consequatur voluptatibus. Aperiam sit maiores, placeat quo voluptates natus!',
    'Adipisci veritatis cumque inventore officiis quidem maiores voluptatum alias, vel obcaecati dolorem aspernatur, repudiandae laudantium nihil sed deleniti. Possimus quos voluptas saepe aliquam. Odio exercitationem animi illum facere ex laboriosam.',
    'Unde, aliquam corporis. Illum quaerat odit adipisci debitis porro tenetur asperiores, nihil qui omnis impedit, fugiat eius sint recusandae ipsum quasi accusantium modi consectetur et fugit repudiandae amet, consequatur delectus.',
    'Rem, doloribus deleniti perferendis omnis obcaecati tempora exercitationem maxime? Quae necessitatibus sint assumenda nihil commodi quam officiis, obcaecati qui minima incidunt dolorem! Blanditiis asperiores, magni fugiat maxime facere ullam. Dolorem.',
    'Eius saepe suscipit, quidem nihil veritatis quam perferendis velit et repudiandae minus animi quos. Corrupti delectus voluptatibus, quibusdam expedita, unde adipisci, ipsam corporis voluptates aliquid ullam veniam error quidem accusamus?',
    'Iure commodi amet nulla, quibusdam earum dolor ullam enim, aut quam repellendus architecto? Expedita vero quae temporibus mollitia voluptatibus. Fugiat delectus consequuntur obcaecati alias tempora minima officia harum et odit?'
]
function generarLorem(n = 1) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = "";
    for (i = 0; i<n; i++) {
        resultado.appendChild(nuevoP(lorems[Math.floor(Math.random()*lorems.length)]));
    }
}
function nuevoP(texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    return p;
}

document.querySelector('[value="Generar"]').addEventListener('click', () => {
    console.log('a')
    generarLorem(document.querySelector("#cantParrf").value);
});