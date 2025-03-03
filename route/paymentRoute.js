const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/paymentController");
const { authenticateToken } = require("../security/auth");
const router = express.Router();

router.get("/", authenticateToken, findAll);
router.post("/", authenticateToken, save);
router.get("/:id", authenticateToken, findbyId)
router.delete("/:id", authenticateToken, deletebyId)
router.put("/:id", authenticateToken, update)


module.exports = router;