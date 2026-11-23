// RUTAS DE PEDIDOS 

const express = require("express");
const router = express.Router();
const PedidosControlador = require("../controlador/pedidosControlador");

router.get("/con-cliente", PedidosControlador.obtenerPedidosConCliente);
router.get("/", PedidosControlador.obtenerPedidos);
router.get("/:id", PedidosControlador.obtenerPedidoPorId);
router.post("/", PedidosControlador.crearPedido);
router.put("/:id", PedidosControlador.actualizarPedido);
router.delete("/:id", PedidosControlador.eliminarPedido);

module.exports = router;