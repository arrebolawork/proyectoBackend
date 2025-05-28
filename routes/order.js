const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/", orderController.create);
router.get("/", orderController.getAll);

module.exports = router;