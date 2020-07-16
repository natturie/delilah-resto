// DATABASE
const { nombre_db } = require("../sequelize");

// SCHEMA QUERY
function crearQueryDb() {
  return `CREATE SCHEMA IF NOT EXISTS ${nombre_db} `;
}

// USERS TABLE QUERY
function tablaUsuariosQuery() {
  return `CREATE TABLE IF NOT EXISTS ${nombre_db}.users (
        user_id int unsigned NOT NULL AUTO_INCREMENT,
        username varchar(45) NOT NULL,
        password varchar(45) NOT NULL,
        firstname varchar(45) NOT NULL,
        lastname varchar(45) NOT NULL,
        address varchar(45) NOT NULL,
        email varchar(45) NOT NULL,
        phone_number varchar(45) NOT NULL,
        is_admin tinyint unsigned NOT NULL,
        PRIMARY KEY (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci`;
}

// PRODUCTS TABLE QUERY
function tablaProductosQuery() {
  return `CREATE TABLE IF NOT EXISTS ${nombre_db}.products (
        product_id int unsigned NOT NULL AUTO_INCREMENT,
        product_name varchar(45) NOT NULL,
        product_price int unsigned NOT NULL,
        product_photo varchar(500) NOT NULL,
        PRIMARY KEY (product_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci`;
}

// ORDERS TABLE QUERY
function tablaPedidosQuery() {
  return `CREATE TABLE IF NOT EXISTS ${nombre_db}.orders (
        order_id int unsigned NOT NULL AUTO_INCREMENT,
        order_status enum('nuevo','confirmado','preparando','encamino','entregado') NOT NULL DEFAULT 'nuevo',
        order_description varchar(45) NOT NULL,
        order_amount int unsigned NOT NULL,
        payment_method enum('efectivo','tarCredito') NOT NULL,
        user_id int unsigned NOT NULL,
        PRIMARY KEY (order_id),
        KEY user_id_idx (user_id),
        CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci`;
}

// ORDER RELATIONSHIP TABLE QUERY
function relacionPedidosQuery() {
  return `CREATE TABLE IF NOT EXISTS ${nombre_db}.orders_products (
        relationship_id int unsigned NOT NULL AUTO_INCREMENT,
        order_id int unsigned NOT NULL,
        product_id int unsigned NOT NULL,
        product_quantity int unsigned NOT NULL,
        PRIMARY KEY (relationship_id),
        KEY order_id_idx (order_id),
        KEY product_id_idx (product_id),
        CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE,
        CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci`;
}

function usarQuery() {
  const query = "USE " + nombre_db;
  return query;
}

//INSERT QUERY
function insertarQuery(table, properties, values) {
  const dataToInsert = values.map((value) => `'${value}'`).join(",");
  const query = `INSERT INTO ${nombre_db}.${table} (${properties}) VALUES (${dataToInsert})`;
  return query;
}

//SELECT QUERY
function seleccionarQuery(table, columns = "*", conditions = null) {
  const query =
    `SELECT ${columns} FROM ${nombre_db}.${table}` +
    ` ${conditions ? `WHERE ${conditions}` : ""}`;

  return query;
}

//UPDATE QUERY
function cargarQuery(table, changes, conditions) {
  const query =
    `UPDATE ${nombre_db}.${table} SET ${changes}` + `WHERE ${conditions}`;
  return query;
}

//DELETE QUERY
function eliminarQuery(table, conditions) {
  const query = `DELETE FROM ${nombre_db}.${table} WHERE ${conditions}`;
  return query;
}

//JOIN QUERY
function joinQuery(mainTable, columns, joiners, conditions) {
  const fullJoiners = joiners
    .map((element) => `JOIN ${nombre_db}.${element} `)
    .toString()
    .replace(/,/g, "");
  const query =
    `SELECT ${columns} FROM ${nombre_db}.${mainTable}` +
    ` ${fullJoiners}` +
    `${conditions ? `WHERE ${conditions}` : ""}`;
  return query;
}

module.exports = {
  crearQueryDb,
  eliminarQuery,
  insertarQuery,
  joinQuery,
  relacionPedidosQuery,
  tablaPedidosQuery,
  tablaProductosQuery,
  seleccionarQuery,
  cargarQuery,
  usarQuery,
  tablaUsuariosQuery,
};
