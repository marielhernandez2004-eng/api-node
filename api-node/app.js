// Configuración express app
// Se encarga de configurar y manejar las rutas de la API utilizando Express

const express = require("express");
const router = require("./src/rutas/rutas");
const empleadosRouter = require("./src/rutas/empleadosRutas");
const categoriasRouter = require("./src/rutas/categoriasRutas");
const clientesRouter = require("./src/rutas/clientesRutas");
const productosRouter = require("./src/rutas/productosRutas");
const pedidosRouter = require("./src/rutas/pedidosRutas");
const detallePedidoRouter = require("./src/rutas/detallePedidoRutas");
const app = express();

app.use(express.json());

// Rutas específicas antes del router genérico /api/
app.use("/api/empleados", empleadosRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/productos", productosRouter);
app.use("/api/pedidos", pedidosRouter);
app.use("/api/detalle-pedido", detallePedidoRouter);

// Router genérico al final
app.use("/api/", router);

module.exports = app;