const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const upload = require("../middleware/uploads");

const {
  getStudents,
  getStudent,
  register,
  login,

  updateStudent,
  deleteStudent,
  uploadImage,
  getMe,
} = require("../controller/student");

router.post("/uploadImage", upload, uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/getAllStudents", getStudents);

router.put("/updateUser/:id", protect, authorize(1), updateStudent);
router.delete("/deleteStudent/:id", protect, authorize(1), deleteStudent);
router.get("/getMe", protect, getMe);

module.exports = router;
