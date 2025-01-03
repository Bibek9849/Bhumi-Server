const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/ProductTypeController");
const router = express.Router();

const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'product_type_images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


router.get("/", findAll);
router.post("/", upload.single('file'), save);
router.get("/:id", findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", update)


module.exports = router;