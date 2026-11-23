//MODELO DE DETALLE PEDIDO_MODELO 

const pool = require("../config/basedatos");

class DetallePedidoModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM detalle_pedido");
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM detalle_pedido WHERE id_detalle = ?",
      [id]
    );
    return rows[0];
  }

  static async obtenerDetallePorPedido(idPedido) {
    const [rows] = await pool.query(
      `
      SELECT
        dp.id_detalle,
        dp.id_pedido,
        pr.nombre AS nombre_producto,
        dp.cantidad,
        dp.precio_unitario AS precio,
        (dp.cantidad * dp.precio_unitario) AS subtotal
      FROM detalle_pedido dp
      INNER JOIN productos pr ON dp.id_producto = pr.id
      INNER JOIN pedidos pe ON dp.id_pedido = pe.id
      WHERE dp.id_pedido = ?
      `,
      [idPedido]
    );
    return rows;
  }

  static async obtenerResumenPorProducto() {
    const [rows] = await pool.query(`
      SELECT
        pr.id AS id_producto,
        pr.nombre AS producto,
        SUM(dp.cantidad) AS total_unidades,
        SUM(dp.cantidad * dp.precio_unitario) AS total_vendido
      FROM detalle_pedido dp
      INNER JOIN productos pr ON dp.id_producto = pr.id
      GROUP BY pr.id, pr.nombre
    `);
    return rows;
  }

  static async crear({ id_pedido, id_producto, cantidad, precio_unitario }) {
    const [result] = await pool.query(
      "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
      [id_pedido, id_producto, cantidad, precio_unitario]
    );
    return {
      id_detalle: result.insertId,
      id_pedido,
      id_producto,
      cantidad,
      precio_unitario,
    };
  }

  static async actualizar(id, { id_pedido, id_producto, cantidad, precio_unitario }) {
    const [result] = await pool.query(
      "UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?",
      [id_pedido, id_producto, cantidad, precio_unitario, id]
    );
    return result.affectedRows > 0;
  }

  static async eliminar(id) {
    const [result] = await pool.query(
      "DELETE FROM detalle_pedido WHERE id_detalle = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = DetallePedidoModelo;