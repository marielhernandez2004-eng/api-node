const express = require("express");
const router = express.Router();

const UsuarioControlador = requiere("../controlador/usuarioControlador");

router.get("/",suarioControlador.obtenerUsuarios);