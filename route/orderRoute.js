const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/orderController");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../security/auth");

router.get("/", findAll);
router.post("/", authenticateToken, save);
router.get("/:id", authenticateToken, findbyId)
router.delete("/:id", authenticateToken, deletebyId)
router.put("/:id", authenticateToken, update)


module.exports = router;