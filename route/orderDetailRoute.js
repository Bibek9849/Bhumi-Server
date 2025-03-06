const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/orderDetailController");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../security/auth");

router.get("/show", findAll);
router.post("/save", authenticateToken, save);
router.get("/:id", findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", authenticateToken, update)


module.exports = router;