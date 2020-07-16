// DATABASE
const { sequelize } = require("../sequelize");
const {
  crearQueryDb,
  relacionPedidosQuery,
  tablaPedidosQuery,
  tablaProductosQuery,
  tablaUsuariosQuery,
} = require("../queries/query");

const creador = async (...queries) => {
  for (let i = 0; i < queries.length; i++) {
    await sequelize.query(queries[i](), { raw: true });
  }
};

const creandoDb = async () =>
  creador(
    crearQueryDb,
    tablaUsuariosQuery,
    tablaProductosQuery,
    tablaPedidosQuery,
    relacionPedidosQuery
  );

module.exports = { creandoDb };
