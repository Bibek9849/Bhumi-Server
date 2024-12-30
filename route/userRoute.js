const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/userController");
const router = express.Router();

const multer = require("multer");
const UserValidation = require("../validation/userValidation");
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'user_images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


router.get("/", findAll);
router.post("/", upload.single('file'), UserValidation, save);
router.get("/:id", findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", update)


module.exports = router;