const { User, Token, Sequelize, Order, Product } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
const transporter = require("../config/nodemailer.js");
const UserController = {
  async create(req, res, next) {
    try {
      const emailFound = await User.findOne({ where: { email: req.body.email } });
      if (emailFound) return res.status(400).send({ message: "Email duplicado en la base de datos" });
      const user = await User.create({
        ...req.body,
        confirmed: false,
        role: "user",
      });
      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: "48h" });

      const url = "http://localhost:3000/user/confirm/" + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `
         <h3>Bienvenido, estás a un paso de registrarte </h3>
         <a href=${url}> Click para confirmar tu registro</a>
       `,
      });
      res.status(201).send({ message: "confirma registro en tu correo", user });
    } catch (err) {
      next(err);
    }
  },
  async login(req, res) {
    const { email, passwd } = req.body;
    try {
      console.log("⏳ Buscando usuario con email:", email);
      const user = await User.findOne({ where: { email } });

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

      const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret || "defaultsecret", { expiresIn: "1h" });
      await Token.create({ token, UserId: user.id });

      res.status(200).send({ message: "Login exitoso", token });
    } catch (err) {
      res.status(500).send({ message: "Error al iniciar sesión", err });
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
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);

      const [updated] = await User.update({ confirmed: true }, { where: { email: payload.email } });

      if (updated === 0) {
        return res.status(404).send("No se encontró el usuario para confirmar");
      }

      res.status(200).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error("Error al confirmar:", error.message);
      res.status(400).send("Token inválido o expirado");
    }
  },
};
module.exports = UserController;
