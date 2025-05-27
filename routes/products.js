const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/", productController.createProduct);
router.get("/search", productController.getProductByName);
router.get("/price", productController.getProductByPrice);
router.get("/:id", productController.getById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
