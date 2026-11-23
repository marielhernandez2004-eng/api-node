const mysql = require("mysql2/promise");


// Pool de comexion a MYSQL USANDO VARIABLES DE ENTORNO CON DEFAULS SIMPLE 
const pool =mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number (process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "practica_sql"
});

module.exports = pool;