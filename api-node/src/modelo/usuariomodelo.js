
let usuarios = [
    { id: 1, nombre: 'Daniela Juarez', email: 'lumberlol50@gmail.com' },
    { id: 2, nombre: 'Juan Perez', email: 'juanperez@gmail.com' },
    { id: 3, nombre: 'Maria Lopez', email: 'marialopez@gmail.com' }
];

class UsuarioModelo {

    // Obtener todos los usuarios
    static obtenerUsuarios() {
        return usuarios;
    }

    // Obtener usuario por ID
    static obtenerUsuarioPorId(id) {
        return usuarios.find(u => u.id === parseInt(id));
    }

    // Crear usuario
    static crear(datos) {
        const nuevoUsuario = {
            id: usuarios.length > 0
                ? Math.max(...usuarios.map(u => u.id)) + 1
                : 1,
            nombre: datos.nombre,
            email: datos.email
        };

        usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    // Actualizar usuario
    static actualizar(id, datos) {
        const usuario = this.obtenerUsuarioPorId(id);

        if (!usuario) return null;

        usuario.nombre = datos.nombre || usuario.nombre;
        usuario.email = datos.email || usuario.email;

        return usuario;
    }

    // Eliminar usuario
    static eliminar(id) {
        const indice = usuarios.findIndex(
            u => u.id === parseInt(id)
        );

        if (indice === -1) return false;

        usuarios.splice(indice, 1);
        return true;
    }
}

module.exports = UsuarioModelo;
