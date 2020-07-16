// DATABASE
const { creandoDb } = require("./creacionBaseDatos");
const { nombre_db } = require("../sequelize");
const { cargarProductos } = require("./cargarProducto");
const { cargarUsuarios } = require("./cargarUsuario");

(async () => {
  try {
    await creandoDb();
    await cargarUsuarios();
    await cargarProductos();
    console.log(`La base de datos ${nombre_db} ha sido creada.\nEl setup se ha completado. `);
  } catch (err) {
    throw new Error(err);
  }
})();
