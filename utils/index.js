// ****PARA EXPORTAR FUNCIONES DE CARPETA UTILS

// FUNCIONES PARA AUTENTICACIÓN Y VALIDACIÓN
const { validarAutenticacion, validarCredenciales } = require("./utilityAutenticacion");

// FUNCIONES PARA USUARIOS
const {
  buscarNombreUsuario,
  buscarPorUsername,
  consultarUsuarios,
  registrarUsuario,
  validarUsuarioExistente,
} = require("./utilityUsuarios");

// FUNCIONES PARA PRODUCTOS
const {
  cambioProducto,
  creandoProducto,
  eliminarProducto,
  buscarIdProducto,
  buscarPrecioProducto,
  consultarProducto,
  nuevoProducto,
  editarProducto,
  editarProductoDB,
} = require("./utilityProductos");

//FUNCIONES PARA PEDIDOS

const {
  descripPedido,
  crearPedido,
  eliminarPedido,
  listadoPedidos,
  actualizarEstadoPedido,
} = require("./utilityPedidos");

module.exports = {
  cambioProducto,
  crearPedido,
  creandoProducto,
  descripPedido,
  eliminarProducto,
  eliminarPedido,
  buscarIdProducto,
  buscarPrecioProducto,
  buscarNombreUsuario,
  buscarPorUsername,
  consultarProducto,
  consultarUsuarios,
  listadoPedidos,
  nuevoProducto,
  registrarUsuario,
  actualizarEstadoPedido,
  editarProducto,
  editarProductoDB,
  validarAutenticacion,
  validarCredenciales,
  validarUsuarioExistente,
};
