const { Category, Product } = require('../models');

const CategoryController = {
  create(req, res) {
    Category.create(req.body)
      .then(category => res.status(201).send({ message: "Categoría creada con éxito", category }))
      .catch(err => res.status(400).send({ error: err.message }));
  },
  getAll(req, res) {
    Category.findAll({ include: Product })
      .then(categories => res.send(categories))
      .catch(err => res.status(500).send({ error: err.message }));
  },
  getById(req, res) {
    Category.findByPk(req.params.id, { include: Product })
      .then(category => {
        if (!category) {
          res.status(404).send({ error: "Categoría no encontrada" });
        } else {
          res.send(category);
        }
      })
      .catch(err => res.status(500).send({ error: err.message }));
  },
  findByName(req, res) {
    const { name } = req.query;
    Category.findAll({
      where: { name },
      include: Product
    })
      .then(categories => res.send(categories))
      .catch(err => res.status(500).send({ error: err.message }));
  },
  update(req, res) {
    Category.update(req.body, { where: { id: req.params.id } })
      .then(([updated]) => {
        if (!updated) {
          res.status(404).send({ error: "Categoría no encontrada" });
        } else {
          res.send({ message: "Categoría actualizada" });
        }
      })
      .catch(err => res.status(400).send({ error: err.message }));
  },
  delete(req, res) {
    Category.destroy({ where: { id: req.params.id } })
      .then(deleted => {
        if (!deleted) {
          res.status(404).send({ error: "Categoría no encontrada" });
        } else {
          res.send({ message: "Categoría eliminada" });
        }
      })
      .catch(err => res.status(500).send({ error: err.message }));
  }
};

module.exports = CategoryController;