// CONTROLADOR CLIENTES 

const ClientesModelo = require("../modelo/ClientesModelo");

class ClientesControlador {
  static async obtenerClientes(req, res) {
    try {
      const clientes = await ClientesModelo.obtenerTodos();
      return res.status(200).json({
        exito: true,
        datos: clientes,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener los clientes",
      });
    }
  }

  static async obtenerClientePorId(req, res) {
    try {
      const cliente = await ClientesModelo.obtenerPorId(req.params.id);
      if (!cliente) {
        return res.status(404).json({
          exito: false,
          mensaje: "Cliente no encontrado",
        });
      }
      return res.status(200).json({
        exito: true,
        datos: cliente,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener el cliente",
      });
    }
  }

  static async crearCliente(req, res) {
    const { nombre, email, ciudad, fecha_registro } = req.body;
    try {
      if (!nombre || !nombre.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo nombre es obligatorio",
        });
      }

      if (!email || !email.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo email es obligatorio",
        });
      }

      const nuevoCliente = await ClientesModelo.crear({
        nombre: nombre.trim(),
        email: email.trim(),
        ciudad: ciudad ? ciudad.trim() : null,
        fecha_registro: fecha_registro ? fecha_registro.trim() : null,
      });

      return res.status(201).json({
        exito: true,
        datos: nuevoCliente,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al crear el cliente",
      });
    }
  }

  static async actualizarCliente(req, res) {
    const { nombre, email, ciudad, fecha_registro } = req.body;
    try {
      if (!nombre || !nombre.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo nombre es obligatorio",
        });
      }

      if (!email || !email.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo email es obligatorio",
        });
      }

      const datosActualizados = {
        nombre: nombre.trim(),
        email: email.trim(),
        ciudad: ciudad ? ciudad.trim() : null,
        fecha_registro: fecha_registro ? fecha_registro.trim() : null,
      };

      const actualizado = await ClientesModelo.actualizar(
        req.params.id,
        datosActualizados
      );
      if (!actualizado) {
        return res.status(404).json({
          exito: false,
          mensaje: "Cliente no encontrado",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Cliente actualizado correctamente",
        datos: { id: req.params.id, ...datosActualizados },
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al actualizar el cliente",
      });
    }
  }

  static async eliminarCliente(req, res) {
    try {
      const eliminado = await ClientesModelo.eliminar(req.params.id);
      if (!eliminado) {
        return res.status(404).json({
          exito: false,
          mensaje: "Cliente no encontrado",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Cliente eliminado correctamente",
      });
    } catch (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          exito: false,
          mensaje: "No se puede eliminar el cliente porque tiene pedidos asociados",
        });
      }
      return res.status(500).json({
        exito: false,
        mensaje: "Error al eliminar el cliente",
      });
    }
  }
}

module.exports = ClientesControlador;