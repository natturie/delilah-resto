const { nombre_db, path_db } = require("./configuraciondb");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(path_db);

module.exports = { nombre_db, sequelize };
