const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const upload = require("../middleware/uploads");

const {
  getStudents,
  getStudent,
  register,
  login,

  updateProfile,
  deleteStudent,
  uploadImage,
  forgotPassword, resetPassword, renderResetPage
} = require("../controller/student");

router.post("/uploadImage", upload, uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/getAllStudents", getStudents);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", renderResetPage);
router.post("/reset-password/:id/:token", resetPassword);
router.put("/update-profile/:id", protect, updateProfile);
router.delete("/deleteStudent/:id", protect, deleteStudent);
router.get("/getMe", protect, getStudent);

module.exports = router;
