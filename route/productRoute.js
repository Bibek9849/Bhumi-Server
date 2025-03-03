const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/productController");
const router = express.Router();

const multer = require("multer");
const { authenticateToken } = require("../security/auth");
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'product_type_images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

router.get("/getAllProduct", findAll);
router.post("/create", upload.single('file'), authenticateToken, save);

router.get("/:id", authenticateToken, findbyId)
router.delete("/:id", authenticateToken, deletebyId)
router.put("/:id", authenticateToken, update)


module.exports = router;