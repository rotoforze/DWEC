import express from 'express';
import morgan from 'morgan';
import { createWriteStream } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as artistaRouter } from './artista/index.mjs';
// declaramos la aplicacion express
const app = express();

app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

// instanciamos la clase encargada de escribir el log, dandole de 
// params el nombre del archivo del log y en opciones
const accessLogStream = createWriteStream('access.log', { flags: 'a' });

// usando el metodo use, indicamos a la app express que usara morgan, indicando que sera
// inmediato y que el metodo de salida sera el anteriormente instanciado
app.use(morgan('common', {
    immediate: true,
    stream: accessLogStream
}));


// configuro express con urlencoded
app.use(express.urlencoded({ extended: false }));

app.use('/artista', artistaRouter);

app.get('/', (request, response) => response.redirect('/artista'));


// abrimos el puerto y ademas, lo mostramos en consola para acceder rapido
app.listen(8080, () => {
 console.log('Acceso a la web --> http://localhost:8080');
});