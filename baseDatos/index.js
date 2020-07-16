const {
  eliminarQuery,
  insertarQuery,
  joinQuery,
  seleccionarQuery,
  cargarQuery,
  usarQuery,
} = require("./queries/query");

const { sequelize } = require("./sequelize");

module.exports = {
  eliminarQuery,
  insertarQuery,
  joinQuery,
  seleccionarQuery,
  cargarQuery,
  usarQuery,
  sequelize,
};
