//AUTH
const { JWT, signature } = require("../auth/atenticacion");

// UTILS- FUNCIONES DE USRUARIOS
const { buscarPorUsername } = require("./utilityUsuarios");

function validarAutenticacion(req, res, next) {
  const token = req.headers.authorization;
  const validatedUser = JWT.verify(token, signature);
  const { is_admin } = validatedUser;
  if (is_admin) {
    req.is_admin = is_admin;
    next();
  } else {
    res.status(403).json("Restringido solo para administradores");
  }
}

async function validarCredenciales(req, res, next) {
  const { username, password } = req.body;
  try {
    const registeredUser = await buscarPorUsername(username);
    if (registeredUser) {
      const { password: dbPassword, is_admin } = registeredUser;
      if (password === dbPassword) {
        const token = JWT.sign({ username, is_admin }, signature, {
          // EL TOKEN EXPIRARÁ EN 10 MINUTOS
          expiresIn: "10m",
        });
        req.jwtToken = token;
        next();
      } else {
        res.status(400).json("Contraseña incorrecta. Intentelo de nuevo");
      }
    } else {
      res.status(400).json("Usuario no válido. Intente nuevamente");
    }
  } catch (err) {
    next(new Error(err));
  }
}

module.exports = { validarAutenticacion, validarCredenciales };
