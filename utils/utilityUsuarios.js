//DATABASE
const { insertarQuery, seleccionarQuery, sequelize } = require("../baseDatos");

async function buscarNombreUsuario(firstname, lastname) {
  const query = seleccionarQuery(
    "users",
    "firstname, lastname",
    `firstname = '${firstname}' AND lastname = '${lastname}'`
  );
  const [usuario_db] = await sequelize.query(query, { raw: true });
  const existingUser = await usuario_db.find(
    (element) =>
      element.firstname === firstname && element.lastname === lastname
  );
  return existingUser ? true : false;
}

async function buscarPorUsername(username) {
  const query = seleccionarQuery(
    "users",
    "user_id, username, password, is_admin",
    `username = '${username}'`
  );
  const [usuario_db] = await sequelize.query(query, { raw: true });
  const foundUser = usuario_db[0];
  return foundUser;
}

async function registrarUsuario(req, res, next) {
  console.log("registrarUsuario");
  const {
    username,
    password,
    firstname,
    lastname,
    address,
    email,
    phone_number,
    is_admin,
  } = req.body;

  if (
    username &&
    password &&
    firstname &&
    lastname &&
    address &&
    email &&
    phone_number

  ) {
    try {
      console.log("43");
      const query = await insertarQuery(
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

      [userId] = await sequelize.query(query, { raw: true });
      console.log("USERID", userId)
      req.createdUserId = userId;
      next();
    } catch (err) {
      next(new Error(err));
    }
  } else {
    res.status(400).json("Faltan argumentos. Intente nuevamente");
  }
}

async function validarUsuarioExistente(req, res, next) {
  const { firstname, lastname, username } = req.body;
  console.log("MIDDELWARE", firstname, lastname, username);
  try {
    const existingUser = await buscarNombreUsuario(firstname, lastname);
    if (!existingUser) {
      const usuario_dbs = await buscarPorUsername(username);
      if (!usuario_dbs) {
        next();
      } else {
        res.status(409).json("El Username seleccionado ya está en uso. Intente con otro");
      }
    } else {
      res.status(409).json("El usuario ya existe");
    }
  } catch (err) {
    next(new Error(err));
  }
}

async function consultarUsuarios(req, res, next) {
  try {
    req.usersList = await usersList();
    next();
  } catch (err) {
    next(new Error(err));
  }
}

async function usersList() {
  const query = seleccionarQuery("users");
  const [usuario_dbs] = await sequelize.query(query, { raw: true });
  return usuario_dbs;
}

module.exports = {
  buscarNombreUsuario,
  buscarPorUsername,
  consultarUsuarios,
  registrarUsuario,
  validarUsuarioExistente,
};
