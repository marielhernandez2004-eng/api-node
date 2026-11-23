// MODELO PRODUCTO

const pool = require("../config/basedatos");

class ProductosModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM productos");
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async obtenerConCategoria() {
    // Ajusta el campo de unión si tu tabla categorias enlaza por id o por nombre
    const [rows] = await pool.query(`
      SELECT p.id, p.nombre, p.precio, c.nombre AS nombre_categoria
      FROM productos p
      INNER JOIN categorias c ON p.categoria = c.nombre
    `);
    return rows;
  }

  static async crear({ nombre, precio, categoria }) {
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

  static async actualizar(id, { nombre, precio, categoria }) {
    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, categoria = ? WHERE id = ?",
      [nombre, precio, categoria, id]
    );
    return result.affectedRows > 0;
  }

  static async eliminar(id) {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = ProductosModelo;