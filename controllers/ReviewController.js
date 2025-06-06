const { Reviews } = require("../models/index.js");

const ReviewController = {
  createReview(req, res) {
    try {
      Reviews.create(req.body).then((review) => res.status(201).send({ message: "Reseña creada exitosamente", review }));
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
};

module.exports = ReviewController;
