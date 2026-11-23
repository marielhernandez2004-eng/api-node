
const express = require("express");
const router = express.Router();

const EmpleadosControlador = require("../controlador/empleadosControlador");
//RUTA PARA OBTENER TODOS LOS EMPLEADOS 

router.get("/", EmpleadosControlador.obtenerEmpleados);
router.get("/:id", EmpleadosControlador.obtenerEmpleadoPorId);
router.post("/", EmpleadosControlador.crearEmpleado);


module.exports = router;
