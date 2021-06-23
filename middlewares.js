const structures = require('./structures');
const constants = require('./constants');

function validarUsuarioExistente(req, res, next) {
    let { usuario } = req.body;
    let found = structures.usuarios.find(x => x.usuario === usuario);
    if (found) {
        res.status(constants.HTTP_STATUS_CODE_CONFLICT).json({mensaje: 'Error. Nombre de usuario no disponible'});
        return;
    }
    next();
}

function estaAutenticado(req, res, next) {
    let { index } = req.headers;
    if (structures.usuarios[index]) {
        next();
    } else {
        res.status(constants.HTTP_STATUS_CODE_UNAUTHORIZED).json({mensaje: 'Usuario no autenticado'})
    }
}

function esAdministrador(req, res, next) {
    let { index } = req.headers;
    if (structures.usuarios[index] && structures.usuarios[index].esAdmin) {
        next();
    } else {
        res.status(constants.HTTP_STATUS_CODE_UNAUTHORIZED).json({mensaje: 'No tiene permisos para realizar esta operación'});
    }
}

module.exports = { validarUsuarioExistente, estaAutenticado, esAdministrador };