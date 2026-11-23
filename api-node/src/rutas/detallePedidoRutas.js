// RUTAS DE DETALLE_PEDIDO 

const express = require("express");
const router = express.Router();
const DetallePedidoControlador = require("../controlador/detallePedidoControlador");

router.get("/pedido/:idPedido", DetallePedidoControlador.obtenerDetallePorPedido);
router.get("/resumen-producto", DetallePedidoControlador.obtenerResumenPorProducto);
router.get("/", DetallePedidoControlador.obtenerDetalles);
router.get("/:id", DetallePedidoControlador.obtenerDetallePorId);
router.post("/", DetallePedidoControlador.crearDetalle);
router.put("/:id", DetallePedidoControlador.actualizarDetalle);
router.delete("/:id", DetallePedidoControlador.eliminarDetalle);

module.exports = router;