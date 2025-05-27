const { User } = require("../models/index.js");
const jwt = require("jsonwebtoken");

const UserController = {
  create(req, res) {
    req.body.role = "user";
    User.create(req.body)
      .then((user) => res.status(201).send({ message: "Usuario creado con éxito", user }))
      .catch((err) => console.error(err));
  },
  async login(req, res) {
    const { name, passwd } = req.body;
    try {
      const user = await User.findOne({ where: { name } });
      if (!user) {
        return res.status(401).send({ message: "Usuario no encontrado" });
      }

      const isPasswordValid = await user.validatePassword(passwd);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "1h" });

      res.status(200).send({ message: "Login exitoso", token });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error al iniciar sesión" });
    }
  },
};
module.exports = UserController;
