const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/feedbackController");
const router = express.Router();
const { authenticateToken } = require("../security/auth");

router.get("/", findAll);
router.post("/", save);
router.get("/:id", authenticateToken, findbyId)
router.delete("/:id", authenticateToken, deletebyId)
router.put("/:id", authenticateToken, update)


module.exports = router;