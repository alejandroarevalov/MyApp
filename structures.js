const Producto = require('./producto');

let usuarios = [
    {
        usuario: 'admin',
        nombreCompleto: 'Alejandro Arévalo',
        email: 'alejandro@acamica.com',
        telefono: '+573138132566',
        direccion: 'Calle 54 # 11 # 22',
        contrasenia: '12344321',
        esAdmin: true
    }
];
let productos = [
    new Producto('Hamburguesa con queso', 500),
    new Producto('Papas fritas', 150)
];
let pedidos = [];

module.exports = { usuarios, productos, pedidos }