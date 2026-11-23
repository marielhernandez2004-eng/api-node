// SSE ENCARGA DE INICIAR EL SERVIDOR Y ESCUCHAR EN QUE PUERTO ESPECIFICO 

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});