// LIBRERIAS
const csv = require("csv-parser");
const fs = require("fs");
const getStream = require("get-stream");

//DATABASE
const { insertarQuery, sequelize, usarQuery } = require("../../baseDatos");

//DATASETS
const usersDs = "../datasets/datasetsUser.csv";

const infoUsuario = async () => {
  const parseStream = csv({ delimiter: "," });
  const data = await getStream.array(
    fs.createReadStream(usersDs).pipe(parseStream)
  );
  return data;
};

const cargarUsuarios = async () => {
  const dataToUpload = await infoUsuario();
  await sequelize.query(usarQuery(), { raw: true });
  for (let i = 0; i < dataToUpload.length; i++) {
    try {
      const {
        username,
        password,
        firstname,
        lastname,
        address,
        email,
        phone_number,
        is_admin,
      } = dataToUpload[i];
      const query = insertarQuery(
        "users",
        "username, password, firstname, lastname, address, email, phone_number, is_admin",
        [
          username,
          password,
          firstname,
          lastname,
          address,
          email,
          phone_number,
          is_admin,
        ]
      );
      await sequelize.query(query, { raw: true });
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = { cargarUsuarios };
