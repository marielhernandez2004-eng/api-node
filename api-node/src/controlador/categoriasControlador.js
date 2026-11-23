// CONTROLADOR PARA CATEGORIAS 

const CategoriasModelo = require("../modelo/categoriasModelo");

class CategoriasControlador {
  static async obtenerCategorias(req, res) {
    try {
      const categorias = await CategoriasModelo.obtenerTodas();
      return res.status(200).json({
        exito: true,
        datos: categorias,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener las categorías",
      });
    }
  }

  static async obtenerCategoriaPorId(req, res) {
    try {
      const categoria = await CategoriasModelo.obtenerPorId(req.params.id);
      if (!categoria) {
        return res.status(404).json({
          exito: false,
          mensaje: "Categoría no encontrada",
        });
      }
      return res.status(200).json({
        exito: true,
        datos: categoria,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener la categoría",
      });
    }
  }

  static async crearCategoria(req, res) {
    const { nombre } = req.body;
    try {
      if (!nombre || !nombre.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo nombre es obligatorio",
        });
      }

      const categoria = await CategoriasModelo.crear({ nombre: nombre.trim() });
      return res.status(201).json({
        exito: true,
        datos: categoria,
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al crear la categoría",
      });
    }
  }

  static async actualizarCategoria(req, res) {
    const { nombre } = req.body;
    try {
      if (!nombre || !nombre.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: "El campo nombre es obligatorio",
        });
      }

      const actualizada = await CategoriasModelo.actualizar(req.params.id, {
        nombre: nombre.trim(),
      });
      if (!actualizada) {
        return res.status(404).json({
          exito: false,
          mensaje: "Categoría no encontrada",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Categoría actualizada correctamente",
        datos: { id_categoria: req.params.id, nombre: nombre.trim() },
      });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al actualizar la categoría",
      });
    }
  }

  static async eliminarCategoria(req, res) {
    try {
      const eliminada = await CategoriasModelo.eliminar(req.params.id);
      if (!eliminada) {
        return res.status(404).json({
          exito: false,
          mensaje: "Categoría no encontrada",
        });
      }

      return res.status(200).json({
        exito: true,
        mensaje: "Categoría eliminada correctamente",
      });
    } catch (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          exito: false,
          mensaje: "No se puede eliminar la categoría porque tiene productos asociados",
        });
      }
      return res.status(500).json({
        exito: false,
        mensaje: "Error al eliminar la categoría",
      });
    }
  }
}

module.exports = CategoriasControlador;