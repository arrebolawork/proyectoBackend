const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");

router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.delete("/logout", UserController.logout);

module.exports = router;
