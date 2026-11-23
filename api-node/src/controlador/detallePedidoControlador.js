// CONTROLADOR DE DETALLE_PEDIDOS

const DetallePedidoModelo = require("../modelo/detallePedidoModelo");

class DetallePedidoControlador {
  static async obtenerDetalles(req, res) {
    try {
      const detalles = await DetallePedidoModelo.obtenerTodos();
      return res.status(200).json({
        exito: true,
        datos: detalles,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener los detalles de pedido",
      });
    }
  }

  static async obtenerDetallePorId(req, res) {
    try {
      const detalle = await DetallePedidoModelo.obtenerPorId(req.params.id);
      if (!detalle) {
        return res.status(404).json({
          exito: false,
          mensaje: "Detalle de pedido no encontrado",
        });
      }
      return res.status(200).json({
        exito: true,
        datos: detalle,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener el detalle de pedido",
      });
    }
  }

  static async obtenerDetallePorPedido(req, res) {
    try {
      const idPedidoNum = Number(req.params.idPedido);
      if (!Number.isInteger(idPedidoNum) || idPedidoNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El idPedido debe ser un entero válido",
        });
      }

      const detallePedido = await DetallePedidoModelo.obtenerDetallePorPedido(
        idPedidoNum
      );
      return res.status(200).json({
        exito: true,
        datos: detallePedido,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener el detalle del pedido",
      });
    }
  }

  static async obtenerResumenPorProducto(req, res) {
    try {
      const resumen = await DetallePedidoModelo.obtenerResumenPorProducto();
      return res.status(200).json({
        exito: true,
        datos: resumen,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener el resumen por producto",
      });
    }
  }

  static async crearDetalle(req, res) {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    try {
      const idPedidoNum = Number(id_pedido);
      const idProductoNum = Number(id_producto);
      const cantidadNum = Number(cantidad);
      const precioNum = Number(precio_unitario);

      if (!Number.isInteger(idPedidoNum) || idPedidoNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo id_pedido debe ser un entero válido",
        });
      }
      if (!Number.isInteger(idProductoNum) || idProductoNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo id_producto debe ser un entero válido",
        });
      }
      if (!Number.isInteger(cantidadNum) || cantidadNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo cantidad debe ser un entero mayor que 0",
        });
      }
      if (precio_unitario === undefined || Number.isNaN(precioNum) || precioNum < 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo precio_unitario debe ser un número válido",
        });
      }

      const nuevoDetalle = await DetallePedidoModelo.crear({
        id_pedido: idPedidoNum,
        id_producto: idProductoNum,
        cantidad: cantidadNum,
        precio_unitario: precioNum,
      });

      return res.status(201).json({
        exito: true,
        datos: nuevoDetalle,
      });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "El pedido o el producto indicado no existe",
        });
      }
      return res.status(500).json({
        exito: false,
        mensaje: "Error al crear el detalle de pedido",
      });
    }
  }

  static async actualizarDetalle(req, res) {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    try {
      const idPedidoNum = Number(id_pedido);
      const idProductoNum = Number(id_producto);
      const cantidadNum = Number(cantidad);
      const precioNum = Number(precio_unitario);

      if (!Number.isInteger(idPedidoNum) || idPedidoNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo id_pedido debe ser un entero válido",
        });
      }
      if (!Number.isInteger(idProductoNum) || idProductoNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo id_producto debe ser un entero válido",
        });
      }
      if (!Number.isInteger(cantidadNum) || cantidadNum <= 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo cantidad debe ser un entero mayor que 0",
        });
      }
      if (precio_unitario === undefined || Number.isNaN(precioNum) || precioNum < 0) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo precio_unitario debe ser un número válido",
        });
      }

      const datosActualizados = {
        id_pedido: idPedidoNum,
        id_producto: idProductoNum,
        cantidad: cantidadNum,
        precio_unitario: precioNum,
      };

      const actualizado = await DetallePedidoModelo.actualizar(
        req.params.id,
        datosActualizados
      );
      if (!actualizado) {
        return res.status(404).json({
          exito: false,
          mensaje: "Detalle de pedido no encontrado",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Detalle de pedido actualizado correctamente",
        datos: { id_detalle: req.params.id, ...datosActualizados },
      });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "El pedido o el producto indicado no existe",
        });
      }
      return res.status(500).json({
        exito: false,
        mensaje: "Error al actualizar el detalle de pedido",
      });
    }
  }

  static async eliminarDetalle(req, res) {
    try {
      const eliminado = await DetallePedidoModelo.eliminar(req.params.id);
      if (!eliminado) {
        return res.status(404).json({
          exito: false,
          mensaje: "Detalle de pedido no encontrado",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Detalle de pedido eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al eliminar el detalle de pedido",
      });
    }
  }
}

module.exports = DetallePedidoControlador;