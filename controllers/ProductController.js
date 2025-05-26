<<<<<<< HEAD
const { Product } = require('../models/index')

const ProductController = {

}

module.exports = ProductController
=======
//no se si falta la conexion a la base de datos???
const { Product } = require("../models/index.js");
const ProductController = {
  createProduct(req, res) {
    Product.create(req.body)
      .then((product) => res.status(201).send({ message: "Producto creado con éxito", product }))
      .catch((err) => console.error(err));
  },
  updateProduct(req, res) {
    const { id } = req.params;

    Product.update(req.body, { where: { id } })
      .then(([updated]) => {
        if (updated) {
          return Product.findByPk(id);
        } else {
          res.status(404).send({ message: "Producto no encontrado" });
        }
      })
      .then((updatedProduct) => {
        if (updatedProduct) {
          res.status(200).send({ message: "Producto actualizado con éxito", product: updatedProduct });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error al actualizar el producto" });
      });
  },
  deleteProduct(req, res) {
    const { id } = req.params;
    Product.destroy({ where: { id } })
      .then((deleted) => {
        if (deleted) {
          res.status(200).send({ message: "Producto eliminado con éxito" });
        } else {
          res.status(404).send({ message: "Producto no encontrado" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error al eliminar el producto" });
      });
  },
};
module.exports = ProductController;
>>>>>>> 64384d0 (endpoint para crear producto con ruta)
