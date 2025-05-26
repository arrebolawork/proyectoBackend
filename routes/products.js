const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/:id", productController.getById);

module.exports = router;
