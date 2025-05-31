const { User, Token, Sequelize, Order, Product } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
const UserController = {
  create(req, res, next) {
    req.body.role = "user";
    User.create(req.body)
      .then((user) => res.status(201).send({ message: "Usuario creado con éxito", user }))
      .catch((err) => {
        console.error(err);
        next(err);
      });
  },
  async login(req, res) {
    const { name, passwd } = req.body;
    try {
      console.log("⏳ Buscando usuario:", name);
      const user = await User.findOne({ where: { name } });
      if (!user) {
        console.log("❌ Usuario no encontrado");
        return res.status(401).send({ message: "Usuario no encontrado" });
      }

      console.log("✅ Usuario encontrado:", user.name);

      const isPasswordValid = await user.validatePassword(passwd);
      if (!isPasswordValid) {
        console.log("❌ Contraseña incorrecta");
        return res.status(401).send({ message: "Contraseña incorrecta" });
      }

      console.log("🔐 Contraseña válida. Generando token...");

      const token = jwt.sign({ id: user.id, name: user.name }, jwt_secret || "defaultsecret", { expiresIn: "1h" });

      console.log("✅ Token generado:", token);

      await Token.create({ token, UserId: user.id });

      console.log("📝 Token guardado en base de datos");

      res.status(200).send({ message: "Login exitoso", token });
    } catch (err) {
      console.error("💥 Error en login:", err);
      res.status(500).send({ message: "Error al iniciar sesión" });
    }
  },
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [{ UserId: req.user.id }, { token: req.headers.authorization }],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "hubo un problema al tratar de desconectarte", error });
    }
  },
  async profile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["passwd"] },
        include: [
          {
            model: Order,
            include: [
              {
                model: Product,
                through: {
                  attributes: ["productCount", "totalPrice"],
                },
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al obtener perfil", error });
    }
  },
};
module.exports = UserController;
