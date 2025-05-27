//no se si falta la conexion a la base de datos???
const { Product } = require("../models/index.js");
const { Op } = require("sequelize");
const ProductController = {
  createProduct(req, res) {
    const { name, price, categoryId } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).send({
        message: "Todos los campos (name, price, categoryId) son obligatorios",
      });
    }
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
  getById(req, res) {
    const { id } = req.params;
    Product.findByPk(id)
      .then((product) => {
        if (product) {
          res.status(200).send({ product });
        } else {
          res.status(404).send({ message: "Producto no encontrado" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error al obtener el producto" });
      });
  },
  getProductByName(req, res) {
    const { name } = req.query;
    Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    })
      .then((products) => {
        if (products.length > 0) {
          res.status(200).send({ products });
        } else {
          res.status(404).send({ message: "No se encontraron productos con ese nombre" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error al buscar productos" });
      });
  },
  getProductByPrice(req, res) {
    const { price } = req.query;
    if (!price) {
      return res.status(400).send({ message: "Debes proporcionar un valor de precio" });
    }
    Product.findAll({
      where: {
        price: parseFloat(price),
      },
    })
      .then((products) => {
        if (products.length > 0) {
          res.status(200).send({ products });
        } else {
          res.status(404).send({ message: "No se encontraron productos con ese precio" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error al buscar productos" });
      });
  },
};
module.exports = ProductController;
