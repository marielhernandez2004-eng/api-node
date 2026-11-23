const express = require("express");
const router = express.Router();
const ClientesControlador = require("../controlador/ClientesControlador");

router.get("/", ClientesControlador.obtenerClientes);
router.get("/:id", ClientesControlador.obtenerClientePorId);
router.post("/", ClientesControlador.crearCliente);
router.put("/:id", ClientesControlador.actualizarCliente);
router.delete("/:id", ClientesControlador.eliminarCliente);

module.exports = router;