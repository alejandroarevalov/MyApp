const express = require('express');
const structures = require('./structures');
const Usuario = require('./usuario');
const constants = require('./constants');
const middlewares = require('./middlewares');
const Producto = require('./producto');
const server = express();
const port = 5000;

server.use(express.json());

server.post('/usuarios', middlewares.validarUsuarioExistente, (req, res) => {
    let { usuario, nombreCompleto, email, telefono, direccion, contrasenia } = req.body;
    let nuevoUsuario = new Usuario(usuario, nombreCompleto, email, telefono, direccion, contrasenia);
    structures.usuarios.push(nuevoUsuario);
    res.status(constants.HTTP_STATUS_CODE_CREATED).json({mensaje: 'Usuario creado satisfactoriamete'});
});

server.post('/login', (req, res) => {
    let { email, usuario, contrasenia } = req.body;
    
    let indexFound = structures.usuarios.findIndex(x => 
        (x.email === email || x.usuario === usuario) && x.contrasenia === contrasenia);

    if (indexFound >= 0) {
        const nombreDelUsuario = structures.usuarios[indexFound].nombreCompleto.split(' ')[0];
        res.status(constants.HTTP_STATUS_CODE_OK)
        .json({mensaje: `Bienvenido ${nombreDelUsuario}`, index: indexFound});
    } else {
        res.status(constants.HTTP_STATUS_CODE_FORBIDDEN).json({mensaje: 'Usuario y/o contraseña invalidos'});
    }
});

server.get('/usuarios', middlewares.estaAutenticado, middlewares.esAdministrador, (req, res) => {
    let nuevoArrayDeUsuarios = structures.usuarios.map(x => (
        {
            usuario: x.usuario, 
            nombreCompleto: x.nombreCompleto, 
            email: x.email,
            telefono: x.telefono,
            direccion: x.direccion
        }));
    res.status(constants.HTTP_STATUS_CODE_OK).json(nuevoArrayDeUsuarios);
});

server.get('/productos', middlewares.estaAutenticado, (req, res) => {
    res.status(constants.HTTP_STATUS_CODE_OK).json(structures.productos);
});

server.post('/productos', middlewares.estaAutenticado, middlewares.esAdministrador, (req, res) => {
    let { nombre, precio } = req.body;
    structures.productos.push(new Producto(nombre, precio));
    res.status(constants.HTTP_STATUS_CODE_CREATED).json({mensaje: 'Producto creado satisfactoriamente'});
})

server.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

