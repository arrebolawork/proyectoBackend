const { Order, Product, User, sequelize } = require("../models/index");

const OrderController = {
  create: async (req, res) => {
    const { userId, orderDate, products } = req.body; // products: [{ id: 1, count: 2 }, { id: 3, count: 1 }]

    try {
      // Crear la orden
      const order = await Order.create({ userId, orderDate });

      // Obtener los productos desde la DB
      const selectedProducts = await Product.findAll({
        where: {
          id: products.map((p) => p.id),
        },
      });

      // Preparar las entradas para OrderProduct
      const orderProductsData = selectedProducts.map((product) => {
        const matched = products.find((p) => p.id === product.id);
        const count = matched?.count || 1;
        return {
          OrderId: order.id,
          ProductId: product.id,
          productCount: count,
          totalPrice: count * product.price,
        };
      });

      // Crear las relaciones en la tabla intermedia
      await sequelize.models.OrderProduct.bulkCreate(orderProductsData);

      res.status(201).send({ message: "Pedido creado con éxito", order });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
  getAll(req, res) {
    Order.findAll({
      include: [
        {
          model: Product,
          through: {
            attributes: ["productCount", "totalPrice"],
          },
        },
        {
          model: User,
        },
      ],
    })
      .then((orders) => res.send(orders))
      .catch((err) => res.status(500).send({ error: err.message }));
  },
};

module.exports = OrderController;
