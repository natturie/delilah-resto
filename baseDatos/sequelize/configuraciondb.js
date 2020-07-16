//CONFIGURACIÓN PARA BASE DE DATOS

const host_db = "localhost";
const nombre_db = "delilah_resto";
const puerto_db = "3306";
const usuario_db = "root";
const password = "";

const path_db = `mysql://${usuario_db}:${password}@${host_db}:${puerto_db}/${nombre_db}`;

module.exports = { nombre_db, path_db };
