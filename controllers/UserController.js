const { User, Token, Sequelize, Order, Product } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
const UserController = {
  async create(req, res, next) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: hash,
        confirmed: false,
        role: "user",
      });
      res.status(201).send({
        message: "Usuari@ registrad@ con éxito",
        user,
      });
    } catch (err) {
      next(err);
    }
  },
  async login(req, res) {
    const { name, passwd } = req.body;
    try {
      console.log("⏳ Buscando usuario:", name);
      const user = await User.findOne({ where: { name } });
      if (!user) {
        return res.status(401).send({ message: "Usuario o contraseña incorrectos" });
      }

      const isPasswordValid = await user.validatePassword(passwd);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Usuario o contraseña incorrectos" });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu correo" });
      }

      const token = jwt.sign({ id: user.id, name: user.name }, jwt_secret || "defaultsecret", { expiresIn: "1h" });
      await Token.create({ token, UserId: user.id });
      res.status(200).send({ message: "Login exitoso", token });
    } catch (err) {
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
