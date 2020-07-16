//LIBRERIAS
const csv = require("csv-parser");
const fs = require("fs");
const getStream = require("get-stream");

//DATABASE
const { insertarQuery, sequelize, usarQuery } = require("../../baseDatos");

//DATASETS
const productsDs = "../datasets/datasetsProd.csv";

const infoProducto = async () => {
  const parseStream = csv({ delimiter: "," });
  const data = await getStream.array(
    fs.createReadStream(productsDs).pipe(parseStream)
  );
  return data;
};

const cargarProductos = async () => {
  const dataToUpload = await infoProducto();
  await sequelize.query(usarQuery(), { raw: true });
  for (let i = 0; i < dataToUpload.length; i++) {
    try {
      const { product_name, product_price, product_photo } = dataToUpload[i];
      const query = insertarQuery(
        "products",
        "product_name, product_price, product_photo",
        [product_name, product_price, product_photo]
      );
      await sequelize.query(query, { raw: true });
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = { cargarProductos };
