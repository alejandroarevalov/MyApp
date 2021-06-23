class Usuario {
    constructor(usuario, nombreCompleto, email, telefono, direccion, contrasenia) {
        this.usuario = usuario;
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.contrasenia = contrasenia;
        this.esAdmin = false;
    }
}

module.exports = Usuario;