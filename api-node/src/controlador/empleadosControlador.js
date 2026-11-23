// CONTROLADOR 

const EmpleadosModelo = require ("../modelo/empleadosModelo");

class EmpleadosControlador{

    static async obtenerEmpleados(req,  res)
    {
        const empleados = await EmpleadosModelo.obtenerDatos(req,res);
        try 
        {
            const empleados = await EmpleadosModelo.obtenerDatos();
            return res.status(200).json({
                exito: true,
                datos: empleados
            });
        }
        catch (error)
        {
            return res.status(500).json({
                exito: false,
                mensaje: "Error al obtener los empleados"
            });
        }
    }
    static async obtenerEmpleadoPorId(req,  res)
    {
        const empleado = await EmpleadosModelo.obtenerPorId(req.params.id);
        try 
        {
            const empleados = await EmpleadosModelo.obtenerPorId(req.params.id);
            return res.status(200).json({
                exito: true,
                datos: empleado
            });
        }
        catch (error)
        {
            return res.status(500).json({
                exito: false,
                mensaje: "Error al obtener el empleado"
            });
        }
    }
      static async crearEmpleado(req,  res)
    {
        const {nombre,area}  = req.body;
        try 
        {
            const empleado = await EmpleadosModelo.crearEmpleado(nombre, area);
            return res.status(201).json({
                exito: true,
                datos: empleado
            });
        }
        catch (error)
        {
            return res.status(500).json({
                exito: false,
                mensaje: "Error al crear el empleado"
            });
 
    }    }
}
module.exports = EmpleadosControlador;
