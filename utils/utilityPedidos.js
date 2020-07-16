// DATABASE
const {
  eliminarQuery,
  insertarQuery,
  joinQuery,
  seleccionarQuery,
  sequelize,
  cargarQuery,
} = require("../baseDatos");

// UTILS
const { buscarPorUsername } = require("./utilityUsuarios");

const { buscarIdProducto, buscarPrecioProducto } = require("./utilityProductos");

async function agregarPedidoADb(req, res) {
  const { username, products, payment_method } = req.body;
  if (username && products && payment_method) {
    const userData = await buscarPorUsername(username);
    if (userData) {
      const userId = userData.user_id;
 
      const [orderDesc, totalPrice] = await obtenerDescripPrecioDePedido(products);
      const addedOrder = await crearPedidoRegistry(
        orderDesc,
        totalPrice,
        payment_method,
        userId
      );
      await crearPedidoRelationship(addedOrder, products);
      return await imprimirInfoPedido(addedOrder);
    } else {
      res.status(400).json("Usuario no encontrado. Intente nuevamente");
    }
  } else {
    res.status(405).json("Faltan argumentos. Intente nuevamente");
  }
}

async function descripPedido(orderInfo) {
  const order = orderInfo[0];
  const productsQuery = joinQuery(
    "orders_products",
    "orders_products.product_quantity, products.*",
    [`products ON orders_products.product_id = products.product_id`],
    `order_id = ${order.order_id}`
  );
  const [productsInfo] = await sequelize.query(productsQuery, {
    raw: true,
  });
  order.products = await productsInfo;
  return order;
}

async function crearPedido(req, res, next) {
  try {
    req.createdOrder = await agregarPedidoADb(req, res);
    next();
  } catch (err) {
    next(new Error(err));
  }
}

async function crearPedidoRegistry(
  orderDescription,
  totalPrice,
  paymentMethod,
  user
) {
  const query = insertarQuery(
    "orders",
    "order_description, order_amount, payment_method, user_id",
    [orderDescription, totalPrice, paymentMethod, user]
  );
  const [addedRegistry] = await sequelize.query(query, { raw: true });
  return addedRegistry;
}

async function crearPedidoRelationship(orderId, products) {
  products.forEach(async (product) => {
    const { productId, quantity } = product;
    const query = insertarQuery(
      "orders_products",
      "order_id, product_id, product_quantity",
      [orderId, productId, quantity]
    );
    await sequelize.query(query, { raw: true });
  });
  return true;
}

async function eliminarPedido(req, res, next) {
  const id = +req.params.orderId;
  try {
    const orderToDelete = await encontrarPedidoPorId(id);
    if (orderToDelete) {
      const query = eliminarQuery("orders", `order_id = ${id}`);
      await sequelize.query(query, { raw: true });
      req.isDeleted = true;
      next();
    } else {
      res.status(404).json("El pedido seleccionado no ha sido encontrado. Intente nuevamente");
    }
  } catch (err) {
    next(new Error(err));
  }
}

async function encontrarPedidoPorId(orderId) {
  const query = seleccionarQuery("orders", "*", `order_id = ${orderId}`);
  const [dbOrder] = await sequelize.query(query, { raw: true });
  const foundOrder = await dbOrder.find(
    (element) => element.order_id === orderId
  );
  return foundOrder;
}

async function listadoPedidos(req, res, next) {
  try {
    const ordersQuery = seleccionarQuery("orders", "order_id");
    const [ordersIds] = await sequelize.query(ordersQuery, { raw: true });
    const detallesPedidos = async () => {
      return Promise.all(
        ordersIds.map(async (order) => imprimirInfoPedido(order.order_id))
      );
    };
    req.ordersList = await detallesPedidos();
    next();
  } catch (err) {
    next(new Error(err));
  }
}

async function obtenerDescripPrecioDePedido(products) {
  let orderDescription = "";
  let subtotal = 0;
  for (let i = 0; i < products.length; i++) {
    orderDescription = orderDescription + (await imprimirDescripNombre(products[i]));
    subtotal = +subtotal + +(await buscarPrecioProducto(products[i]));
  }
  return [orderDescription, subtotal];
}

async function imprimirDescripNombre(product) {
  const { productId, quantity } = product;
  const productName = (await buscarIdProducto(productId)).product_name;
  const productDesc = `${quantity}x${productName.slice(0, 5)} `;
  return productDesc;
}

async function imprimirInfoPedido(orderId) {
  const ordersQuery = joinQuery(
    "orders",
    "orders.*, users.username, users.firstname, users.lastname,users.address, users.email, users.phone_number",
    ["users ON orders.user_id = users.user_id"],
    `order_id = ${orderId}`
  );
  const [orderInfo] = await sequelize.query(ordersQuery, { raw: true });
  return descripPedido(orderInfo);
}

async function actualizarEstadoPedido(req, res, next) {
  const id = +req.params.orderId;
  const { status } = req.body;
  const validStatus = validandoStatus(status);
  if (validStatus) {
    try {
      const orderToUpdate = await encontrarPedidoPorId(id);
      if (orderToUpdate) {
        const query = cargarQuery(
          "orders",
          `order_status = '${status}'`,
          `order_id = ${id}`
        );
        await sequelize.query(query, { raw: true });
        req.updatedOrder = await encontrarPedidoPorId(id);
      } else {
        res.status(404).json("El pedido no ha sido encontrado. Intente nuevamente");
      }
      next();
    } catch (err) {
      next(new Error(err));
    }
  } else {
    res.status(405).json("El status suministrado no es válido. Intente nuevamente");
  }
}

function validandoStatus(submittedStatus) {
  const validStatus = [
    "nuevo",
    "confirmado",
    "preparando",
    "encamino",
    "entregado",
  ];
  const estadoExistente = validStatus.find(
    (status) => status === submittedStatus
  );
  return estadoExistente;
}

module.exports = {
  descripPedido,
  crearPedido,
  eliminarPedido,
  listadoPedidos,
  actualizarEstadoPedido,
};
