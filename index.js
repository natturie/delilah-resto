//LIBRERIAS
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const CORS = require("cors");

//UTILS
const {
  registrarUsuario,
  validarUsuarioExistente,
  validarCredenciales,
  validarAutenticacion,
  consultarProducto,
  consultarUsuarios,
  creandoProducto,
  editarProducto,
  eliminarProducto,
  crearPedido,
  listadoPedidos,
  actualizarEstadoPedido,
  eliminarPedido,
} = require("./utils");

//DATABASE
const { insertarQuery, seleccionarQuery, sequelize } = require("./baseDatos");

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

// server.use(express.json(), CORS());
// server.use(express.urlencoded({extended:false}));


// ENDPOINTS PARA USUARIOS
server.get("/v1/usuarios/", validarAutenticacion, consultarUsuarios, (req, res) => {
  
  const { usersList } = req;
  res.status(200).json(usersList);
});

server.post("/v1/usuarios/", validarUsuarioExistente,  registrarUsuario, (req, res) => {
  
  sequelize.authenticate().then(async () => {
      
  const { firstname, lastname } = req.body;
  const query = seleccionarQuery(
    "users",
    "user_id, address, email, phone_number, firstname, lastname",
    `firstname = '${firstname}' AND lastname = '${lastname}'`
  );
  const [resultados] = await sequelize.query(query, { raw: true });
  
  res.status(201).json(resultados[0]);
    
  
  })
  .catch(err => {
    res.statusCode = 500;
    console.error('No se puede conectar con la base de datos:', err);
  });
});

server.post("/v1/usuarios/login", validarCredenciales, (req, res) => {
  const { jwtToken } = req;
  const loginResponse = { token: jwtToken };
  res.status(200).json(loginResponse);
});

// ENDOPINTS PARA PRODUCTOS
server.get("/v1/productos/", consultarProducto, (req, res) => {
  const { productList } = req;
  res.status(200).json(productList);
});

server.post("/v1/productos/", validarAutenticacion, creandoProducto, (req, res) => {
  const { addedProduct } = req;
  res.status(201).json(addedProduct);
});

server.put(
  "/v1/productos/:productId",
  validarAutenticacion,
  editarProducto,
  (req, res) => {
    const { updatedProduct } = req;
    res.status(202).json(updatedProduct);
  }
);

server.delete(
  "/v1/productos/:productId",
  validarAutenticacion,
  eliminarProducto,
  (req, res) => {
    const { isDeleted } = req;
    isDeleted && res.status(200).json("El producto seleccionado ha sido eliminado");
  }
);

// ENDPOINTS PARA PEDIDOS
server.get("/v1/pedidos/", validarAutenticacion, listadoPedidos, (req, res) => {
  const { ordersList } = req;
  res.status(200).json(ordersList);
});

server.post("/v1/pedidos/", crearPedido, (req, res) => {
  const { createdOrder } = req;
  res.status(201).json(createdOrder);
});

server.put(
  "/v1/pedidos/:orderId",
  validarAutenticacion,
  actualizarEstadoPedido,
  (req, res) => {
    const { updatedOrder } = req;
    res.status(202).json(updatedOrder);
  }
);

server.delete("/v1/pedidos/:orderId", validarAutenticacion, eliminarPedido, (req, res) => {
  const { isDeleted } = req;
  isDeleted && res.status(200).json("El pedido seleccionado ha sido eliminado");
});

// DETECCIÓN DE ERRORES
server.use((err, req, res, next) => {
  if (!err) {
    return next();
  } else if (err.name === "JsonWebTokenError") {
    console.log(err);
    res.status(400).json(`Error: ${err.message}`);
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json("El token ha expirado, por favor ingrese nuevamente");
  } else {
    console.log("Ha ocurrido un error", err), res.status(500).send("Error");
  }
});

//SET UP SERVER
server.listen(3000, () => {
  console.log("Iniciando servidor de Delilah Resto ... ");
});
