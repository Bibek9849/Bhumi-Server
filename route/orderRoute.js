const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/orderController");
const router = express.Router();

router.get("/", findAll);
router.post("/", save);
router.get("/:id", findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", update)


module.exports = router;