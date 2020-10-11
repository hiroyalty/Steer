const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.get("/all", userController.onGetAllUsers);
router.get("/byId", userController.onGetUserById);
router.delete("/byId", userController.onDeleteUserById);

module.exports = router;
