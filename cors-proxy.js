/* eslint-disable */
const cors_proxy = require('cors-anywhere');

const PORT = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [],
}).listen(PORT, '0.0.0.0', function () {
  console.log('Servidor CORS Anywhere corriendo en el puerto ' + PORT);
});
