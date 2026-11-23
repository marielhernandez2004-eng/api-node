//MODELO CLIENTES 

const pool = require("../config/basedatos");

class ClientesModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM clientes");
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM clientes WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async crear({ nombre, email, ciudad, fecha_registro }) {
    const [result] = await pool.query(
      "INSERT INTO clientes (nombre, email, ciudad, fecha_registro) VALUES (?, ?, ?, COALESCE(?, CURDATE()))",
      [nombre, email, ciudad, fecha_registro || null]
    );
    return {
      id: result.insertId,
      nombre,
      email,
      ciudad,
      fecha_registro: fecha_registro || new Date().toISOString().slice(0, 10),
    };
  }

  static async actualizar(id, { nombre, email, ciudad, fecha_registro }) {
    const [result] = await pool.query(
      "UPDATE clientes SET nombre = ?, email = ?, ciudad = ?, fecha_registro = COALESCE(?, fecha_registro) WHERE id = ?",
      [nombre, email, ciudad, fecha_registro || null, id]
    );
    return result.affectedRows > 0;
  }

  static async eliminar(id) {
    const [result] = await pool.query(
      "DELETE FROM clientes WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = ClientesModelo;