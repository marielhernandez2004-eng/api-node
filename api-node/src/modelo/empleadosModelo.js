//EMPLEADOS MODELOS 

const pool = require("../config/basedatos");

class EmpleadosModelo {

    static async obtenerTodos()
    {
        const [rows] = await pool.query("SELECT * FROM empleados");
        return rows;
    }
      static async obtenerPorId(id)
    {
        const [rows] = await pool.query("SELECT * FROM empleados where id_empleado  =?",[id]);
        return rows[0];
    }
    static async crearEmpleado(nombre,area)
    {
        const [result] = await pool.query("INSERT INTO empleados (nombre, area) VALUES (?,?)",[nombre,area]);
        return {id:result.insertId,nombre,area};
    }

}

module.exports = EmpleadosModelo;
