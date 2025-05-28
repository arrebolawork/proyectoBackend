const { Order, Product, User } = require('../models/index');

const OrderController = {
  create(req, res) {
    const { userId, orderDate, products } = req.body;
    if (!userId || !orderDate || !Array.isArray(products) || products.length === 0) {
      return res.status(400).send({ message: "userId, orderDate y products son obligatorios" });
    }
    Order.create(
      { userId, orderDate },
    )
      .then(order => {
        return order.setProducts(products).then(() => order);
      })
      .then(order => res.status(201).send({ message: "Pedido creado con éxito", order }))
      .catch(err => res.status(400).send({ error: err.message }));
  },
  getAll(req, res) {
    Order.findAll({
      include: [
        { model: Product },
        { model: User }
      ]
    })
      .then(orders => res.send(orders))
      .catch(err => res.status(500).send({ error: err.message }));
  }
};

module.exports = OrderController;