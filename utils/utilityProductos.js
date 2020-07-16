//DATABASE
const {
  eliminarQuery,
  insertarQuery,
  seleccionarQuery,
  sequelize,
  cargarQuery,
} = require("../baseDatos");

async function cambioProducto(productToUpdate, updatedProperties) {
  const properties = Object.keys(updatedProperties).filter(
    (property) =>
      updatedProperties[property] &&
      updatedProperties[property] !== " " &&
      updatedProperties[property] !== "null" &&
      updatedProperties[property] !== "undefined" &&
      !updatedProperties[property].toString().includes("  ")
  );
  newProperties = properties.reduce((obj, property) => {
    obj[property] = updatedProperties[property];
    return obj;
  }, {});
  const updatedProduct = { ...productToUpdate, ...newProperties };
  return updatedProduct;
}

async function creandoProducto(req, res, next) {
  const { product_name, product_photo, product_price } = req.body;
  if (product_name && product_photo && product_price >= 0) {
    try {
      const createdProduct = await nuevoProducto(
        product_name,
        product_photo,
        product_price
      );
      req.addedProduct = { productId: await createdProduct };
      next();
    } catch (err) {
      next(new Error(err));
    }
  } else {
    res.status(400).json("Faltan argumentos. Intente nuevamente");
  }
}

async function eliminarProducto(req, res, next) {
  const id = +req.params.productId;
  try {
    const productToDelete = await buscarIdProducto(id);
    if (productToDelete) {
      const existingOrder = await ordenEnCursoProd(id);
      if (!existingOrder) {
        const isDeleted = async () => {
          const query = eliminarQuery("products", `product_id = ${id}`);
          await sequelize.query(query, { raw: true });
          return true;
        };
        req.isDeleted = await isDeleted();
        next();
      } else {
        res
          .status(409)
          .json(
            "El producto que está intentando eliminar está asociado a un pedido activo. Resuelva e intente más tarde"
          );
      }
    } else {
      res.status(404).json("Producto no encontrado. Intente nuevamente");
    }
  } catch (err) {
    next(new Error(err));
  }
}

async function ordenEnCursoProd(productId) {
  const query = seleccionarQuery(
    "orders_products",
    "*",
    `product_id = ${productId}`
  );
  const [results] = await sequelize.query(query, { raw: true });
  if (results.length) {
    return true;
  } else {
    return false;
  }
}

async function buscarIdProducto(id) {
  const query = seleccionarQuery("products", "*", `product_id = ${id}`);
  const [dbProduct] = await sequelize.query(query, { raw: true });
  const foundProduct = await dbProduct.find(
    (element) => element.product_id === id
  );
  return foundProduct;
}

async function buscarPrecioProducto(product) {
  const { productId, quantity } = product;
  const productPrice = (await buscarIdProducto(productId)).product_price;
  const subtotal = `${+productPrice * +quantity}`;
  return subtotal;
}

async function consultarProducto(req, res, next) {
  try {
    req.productList = await productosEnLista();
    next();
  } catch (err) {
    next(new Error(err));
  }
}

async function nuevoProducto(product_name, product_photo, product_price) {
  const query = insertarQuery(
    "products",
    "product_name, product_photo, product_price",
    [product_name, product_photo, product_price]
  );
  const [addedProduct] = await sequelize.query(query, { raw: true });
  return addedProduct;
}

async function productosEnLista() {
  const query = seleccionarQuery("products");
  const [dbProducts] = await sequelize.query(query, { raw: true });
  return dbProducts;
}

async function editarProducto(req, res, next) {
  const id = +req.params.productId;
  const updatedProperties = req.body;
  try {
    const productToUpdate = await buscarIdProducto(id);
    if (productToUpdate) {
      const updatedProduct = await cambioProducto(
        productToUpdate,
        updatedProperties
      );
      const savedProduct = await editarProductoDB(id, updatedProduct);
      req.updatedProduct = savedProduct;
      next();
    } else {
      res.status(404).json("Producto no encontrado. Intente nuevamente");
    }
  } catch (err) {
    next(new Error(err));
  }
}

async function editarProductoDB(id, product) {
  const { product_name, product_photo, product_price } = product;
  const query = cargarQuery(
    "products",
    `product_name = '${product_name}', product_photo = '${product_photo}', product_price = '${product_price}'`,
    `product_id = ${id}`
  );
  await sequelize.query(query, { raw: true });
  const dbProduct = await buscarIdProducto(id);
  return dbProduct;
}

module.exports = {
  cambioProducto,
  creandoProducto,
  eliminarProducto,
  buscarIdProducto,
  buscarPrecioProducto,
  consultarProducto,
  nuevoProducto,
  editarProducto,
  editarProductoDB,
};
