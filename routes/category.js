const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.post("/", categoryController.create);
router.get("/search/byname", categoryController.findByName);
router.get("/:id", categoryController.getById);
router.get("/", categoryController.getAll);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

module.exports = router;