// CONTROLADOR DE PRODUCTOS

const pool = require("../config/basedatos");

class ProductosModelo {
  static async obtenerProductos() {
    const [rows] = await pool.query("SELECT * FROM productos");
    return rows;
  }

  static async obtenerProductoPorId(id) {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async obtenerProductosConCategoria() {
    const [rows] = await pool.query(`
      SELECT p.id, p.nombre, p.precio, c.nombre AS nombre_categoria
      FROM productos p
      INNER JOIN categorias c ON p.categoria = c.nombre
    `);
    return rows;
  }

  static async crearProducto({ nombre, precio, categoria }) {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, precio, categoria) VALUES (?, ?, ?)",
      [nombre, precio, categoria]
    );
    return {
      id: result.insertId,
      nombre,
      precio,
      categoria,
    };
  }

  static async actualizarProducto(id, { nombre, precio, categoria }) {
    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, categoria = ? WHERE id = ?",
      [nombre, precio, categoria, id]
    );
    return result.affectedRows > 0;
  }

  static async eliminarProducto(id) {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = ProductosModelo;