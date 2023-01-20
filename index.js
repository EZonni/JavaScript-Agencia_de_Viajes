// --- Express ---

import express from 'express';
const app = express();


// ----- Database -----

import db from './config/db.js';

db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));


// --- PUG ---

app.set('view engine', 'pug');

app.use(express.static('public')); // Acceso a la carpeta Public


// --- Middleware ---

// Obtener el año actual
app.use((req, res, next) => {

    let year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});



// --- Habilitar "body parser" para leer los datos del formulario ---

app.use(express.urlencoded({extended: true}));



// --- Routers ---

import router from './routes/index.js';
app.use('/', router);


// --- Port ---

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});