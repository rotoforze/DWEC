15. Partiendo de la primera tarjeta de curso, localiza y trabaja sobre su tarjeta vecina, la que le sigue inmediatamente.
16. El botón en la tarjeta premium es nuestro punto de partida. Desde él, navega por el DOM hacia arriba hasta encontrar el contenedor que agrupa toda su información (un div con la clase 'info').
17. Encuentra el título `h2` que se encuentra dentro de la tarjeta del curso premium.
18. Partiendo desde el pie de página (footer), localiza el contenedor principal que está justo antes y aplícale un borde de 2px de color rojo para destacarlo.
19. Comienza en el primer `div` de información (`.info`). Desde ahí, sube a su elemento padre (la tarjeta) y, una vez ahí, desciende para encontrar el primer elemento hijo de esa tarjeta, que debería ser la imagen.
20. Localiza el segundo enlace del menú. Tu objetivo es, partiendo de él, llegar hasta el título `<h1>` principal de la cabecera y cambiar su color a naranja.
21. El botón de la tarjeta premium debe tener una funcionalidad. Haz que, al pulsarlo, se dispare una alerta del navegador con el mensaje: 'Accediendo a información exclusiva para miembros premium'.
22. El formulario de contacto debe ser funcional. Evita que la página se recargue al enviarlo y, en su lugar, captura los valores de los campos de nombre y mensaje y muéstralos en la consola.
23. Hay información oculta en la tarjeta del curso de React. Implementa una funcionalidad para que, al hacer clic en el título de ESE curso, el párrafo oculto se vuelva visible.
24. Para estandarizar los títulos de los cursos, recorre todos los `h2` que están dentro de las tarjetas y añade el prefijo "[CURSO]" al principio de su texto.
25. Para mejorar la legibilidad, se ha decidido agrupar visualmente los cursos por temática. Tu objetivo es encontrar todas las tarjetas de cursos que pertenezcan a la categoría 'Desarrollo Web'. Una vez identificadas, debes aplicarles un ligero fondo de color (#f0f0f0) para que se distingan del resto.
26. Es necesario añadir la duración a todos los cursos. Para cada tarjeta, debes crear dinámicamente un nuevo párrafo, asignarle la clase 'duracion' y el texto 'Duración: 20 horas', y añadirlo al final de la sección de información.
27. Queremos aplicar un estilo especial a los cursos estándar. Filtra la lista de tarjetas para obtener solo aquellas que NO son 'premium'. A las tarjetas resultantes, aplícales un borde punteado de 2px de color negro.
28. Necesitamos una lista limpia con los nombres de las categorías para nuestro sistema de analítica. Genera un array que contenga únicamente el texto de cada párrafo de categoría y muéstralo en la consola.
29. Para mejorar la accesibilidad y el rastreo, recorre todos los enlaces de la navegación y asígnales un atributo `data-tipo` con el valor `enlace-nav`.
30. Limita tu búsqueda a la sección del formulario. Encuentra el área de texto (`textarea`) y cambia su texto de ejemplo (`placeholder`) a 'Escribe aquí tu consulta detallada'.
31. Hay una oferta especial para el curso de React. Localiza su tarjeta y, buscando solo dentro de ella, encuentra el párrafo oculto para añadirle el texto ' (¡Oferta especial!)' al final.
32. Se necesita una clase específica para las imágenes de los cursos. Recorre todas las tarjetas y, para cada una, encuentra su imagen y aplícale la clase 'imagen-curso'.