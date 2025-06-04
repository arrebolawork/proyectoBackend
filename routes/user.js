const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");

router.get("/me", authentication, UserController.profile);
router.get("/confirm/:emailToken", UserController.confirm);
router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
