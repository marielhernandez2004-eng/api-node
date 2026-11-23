//CONTROLADOR DE PEDIDOS 

const PedidosModelo = require("../modelo/pedidosModelo");

class PedidosControlador {
  static async obtenerPedidos(req, res) {
    try {
      const pedidos = await PedidosModelo.obtenerTodos();
      return res.status(200).json({
        exito: true,
        datos: pedidos,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener los pedidos",
      });
    }
  }

  static async obtenerPedidoPorId(req, res) {
    try {
      const pedido = await PedidosModelo.obtenerPorId(req.params.id);
      if (!pedido) {
        return res.status(404).json({
          exito: false,
          mensaje: "Pedido no encontrado",
        });
      }
      return res.status(200).json({
        exito: true,
        datos: pedido,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener el pedido",
      });
    }
  }

  static async obtenerPedidosConCliente(req, res) {
    try {
      const pedidos = await PedidosModelo.obtenerConCliente();
      return res.status(200).json({
        exito: true,
        datos: pedidos,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener los pedidos con cliente",
      });
    }
  }

  static async crearPedido(req, res) {
    const { cliente_id, fecha } = req.body;
    try {
      const clienteIdNum = Number(cliente_id);
      if (!cliente_id || !Number.isInteger(clienteIdNum) || clienteIdNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo cliente_id debe ser un entero válido",
        });
      }

      const nuevoPedido = await PedidosModelo.crear({
        cliente_id: clienteIdNum,
        fecha: fecha ? String(fecha).trim() : null,
      });

      return res.status(201).json({
        exito: true,
        datos: nuevoPedido,
      });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "El cliente indicado no existe",
        });
      }
      return res.status(500).json({
        exito: false,
        mensaje: "Error al crear el pedido",
      });
    }
  }

  static async actualizarPedido(req, res) {
    const { cliente_id, fecha } = req.body;
    try {
      const clienteIdNum = Number(cliente_id);
      if (!cliente_id || !Number.isInteger(clienteIdNum) || clienteIdNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo cliente_id debe ser un entero válido",
        });
      }

      const datosActualizados = {
        cliente_id: clienteIdNum,
        fecha: fecha ? String(fecha).trim() : null,
      };

      const actualizado = await PedidosModelo.actualizar(
        req.params.id,
        datosActualizados
      );
      if (!actualizado) {
        return res.status(404).json({
          exito: false,
          mensaje: "Pedido no encontrado",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Pedido actualizado correctamente",
        datos: { id: req.params.id, ...datosActualizados },
      });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "El cliente indicado no existe",
        });
      }
      return res.status(500).json({
        exito: false,
        mensaje: "Error al actualizar el pedido",
      });
    }
  }

  static async eliminarPedido(req, res) {
    try {
      const eliminado = await PedidosModelo.eliminar(req.params.id);
      if (!eliminado) {
        return res.status(404).json({
          exito: false,
          mensaje: "Pedido no encontrado",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Pedido eliminado correctamente",
      });
    } catch (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          exito: false,
          mensaje:
            "No se puede eliminar el pedido porque tiene detalles asociados",
        });
      }
      return res.status(500).json({
        exito: false,
        mensaje: "Error al eliminar el pedido",
      });
    }
  }
}

module.exports = PedidosControlador;