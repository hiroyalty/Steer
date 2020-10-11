const express = require("express");
// controllers
const deleteController = require("../controllers/deleteController");

const router = express.Router();

router
  .delete('/room/:roomId', deleteController.deleteRoomById)
  .delete('/message/:messageId', deleteController.deleteMessageById)

  module.exports = router;
