const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/userController");
const router = express.Router();

const multer = require("multer");
const UserValidation = require("../validation/userValidation");
const { authenticateToken, authorizeRole } = require("../security/auth");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


router.get("/", findAll);
router.post("/save", upload.single('file'), save);
router.get("/:id", findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", update)


module.exports = router;