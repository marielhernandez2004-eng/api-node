// MODELO DE PEDIDOS 

const pool = require("../config/basedatos");

class PedidosModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM pedidos");
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await pool.query("SELECT * FROM pedidos WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async obtenerConCliente() {
    const [rows] = await pool.query(`
      SELECT p.id, p.cliente_id, p.fecha, c.nombre AS nombre_cliente
      FROM pedidos p
      INNER JOIN clientes c ON p.cliente_id = c.id
    `);
    return rows;
  }

  static async crear({ cliente_id, fecha }) {
    const [result] = await pool.query(
      "INSERT INTO pedidos (cliente_id, fecha) VALUES (?, COALESCE(?, CURDATE()))",
      [cliente_id, fecha || null]
    );
    return {
      id: result.insertId,
      cliente_id,
      fecha: fecha || new Date().toISOString().slice(0, 10),
    };
  }

  static async actualizar(id, { cliente_id, fecha }) {
    const [result] = await pool.query(
      "UPDATE pedidos SET cliente_id = ?, fecha = COALESCE(?, fecha) WHERE id = ?",
      [cliente_id, fecha || null, id]
    );
    return result.affectedRows > 0;
  }

  static async eliminar(id) {
    const [result] = await pool.query("DELETE FROM pedidos WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = PedidosModelo;