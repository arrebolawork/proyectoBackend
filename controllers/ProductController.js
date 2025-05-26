//no se si falta la conexion a la base de datos???
const { Product } = require("../models/index.js");
const ProductController = {
  createProduct(req, res) {
    Product.create(req.body)
      .then((product) => res.status(201).send({ message: "Producto creado con éxito", product }))
      .catch((err) => console.error(err));
  },
};
module.exports = ProductController;
