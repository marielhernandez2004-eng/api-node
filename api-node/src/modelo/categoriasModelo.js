const pool = require("../config/basedatos");

const categoriasModelo = {
 
 
  async obtenerTodas() {
    
    const [rows] = await pool.query("SELECT * FROM categorias");
    return rows;
  },

  async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM categorias WHERE id_categoria = ?", [id]
    );
    return rows[0];
  },

  async crear(datos) {
    const { nombre } = datos;
    const [result] = await pool.query(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre]
    );
    return { id_categoria: result.insertId, nombre };
  },

  async actualizar(id, datos) {
    const { nombre } = datos;
    const [result] = await pool.query(
      "UPDATE categorias SET nombre = ? WHERE id_categoria = ?",
      [nombre, id]
    );
    return result.affectedRows > 0;
  },

  async eliminar(id) {
    const [result] = await pool.query(
      "DELETE FROM categorias WHERE id_categoria = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = categoriasModelo;