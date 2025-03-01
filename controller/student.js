const asyncHandler = require("../middleware/async");
const Student = require("../model/student");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");




exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please enter your registered email" });
  }

  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(400).json({ msg: "User with this email does not exist" });
  }

  // Fix: Use only `JWT_SECRET`, don't append password
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ email: student.email, id: student._id }, secret, {
    expiresIn: "15m",
  });

  const resetLink = `http://localhost:3000/api/users/reset-password/${student._id}/${token}`;
  console.log("Generated Reset Link:", resetLink); // Debugging Log

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
          <h2>Password Reset</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}" target="_blank">${resetLink}</a>
          <p>This link will expire in 15 minutes.</p>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email Error:", error);
      return res.status(500).json({ msg: "Failed to send email", error: error.message });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ success: true, message: "Password reset link sent!" });
  });
});

exports.renderResetPage = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  console.log("Received Reset Request: ", { id, token });

  const student = await Student.findById(id);
  if (!student) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const secret = process.env.JWT_SECRET; // ✅ Use the same secret
  try {
    const decoded = jwt.verify(token, secret);
    console.log("Token Decoded Successfully:", decoded);

    res.render("index", { email: decoded.email });
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(400).json({ msg: "Invalid or expired token" });
  }
});


exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  console.log("Received Password Reset Request:", { id, token });
  console.log("Request Body:", req.body); // ✅ Debugging Log

  // Extract password and confirmPassword correctly
  const { password, "confirm-password": confirmPassword } = req.body; // ✅ Fix here

  if (!password || !confirmPassword) {
    console.log("Missing Fields!"); // Debugging log
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    console.log("Passwords Do Not Match!"); // Debugging log
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  const student = await Student.findOne({ _id: id });

  if (!student) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const secret = process.env.JWT_SECRET;
  console.log("Secret Used for Verification:", secret);

  try {
    const decoded = jwt.verify(token, secret);
    console.log("Token Verified Successfully:", decoded);

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateResult = await Student.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error("Password update failed in database.");
    }

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ msg: "Invalid or expired token", error: error.message });
  }
});


exports.getStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find({});
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// @desc    Get single student
// @route   GET /api/v1/students/:id
// @access  Private

exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res
      .status(404)
      .json({ message: "User not found with id of ${req.params.id}" });
  } else {
    res.status(200).json({
      success: true,
      data: student,
    });
  }
});

// @desc    Create new student
// @route   POST /api/v1/students
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
  const student = await Student.findOne({ contact: req.body.data.contact });
  console.log(req.body.data);
  if (student) {
    return res.status(400).send({ message: "User already exists" });
  }


  await Student.create(req.body.data);

  res.status(200).json({
    success: true,
    message: "User created successfully",
  });
});

// @desc   Login student
// @route  POST /api/v1/students/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
  const { contact, password } = req.body.data;

  if (!contact || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a contact and password" });
  }

  // Check if student exists
  const student = await Student.findOne({ contact }).select("+password+role");
  console.log(student.role)

  if (!student || !(await student.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  sendTokenResponse(student, 200, res, student.role, student.fullName, student.image, student.email, student.contact, student._id);
});



// @desc    Update student profile
// @route   PUT /api/v1/students/me
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  // Handle form data updates
  Object.keys(req.body).forEach((key) => {
    student[key] = req.body[key];
  });

  // Handle image upload
  if (req.file) {
    // Delete the old image if it exists
    if (student.image) {
      const oldImagePath = path.join(__dirname, "..", "public", "uploads", student.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log("Error deleting old image:", err);
      });
    }

    // Save the new image
    student.image = req.file.filename;
  }

  await student.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: student,
  });
});

// Get current user
// @access  Private

exports.getMe = asyncHandler(async (req, res, next) => {
  // Show current user and don't show the password
  const student = await Student.findById(req.user.id).select("-password");

  res.status(200).json(student);
});

// @desc    Delete student
// @route   DELETE /api/v1/students/:id
// @access  Private

exports.deleteStudent = asyncHandler(async (req, res, next) => {
  console.log(req.params.id); // Debugging log
  Student.findByIdAndDelete(req.params.id)
    .then((student) => {
      if (student) {
        if (student.image) {  // ✅ Fix: Check if image exists before deleting
          var imagePath = path.join(__dirname, "..", "public", "uploads", student.image);

          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log("Error deleting image:", err);
            }
            res.status(200).json({
              success: true,
              message: "Student deleted successfully",
            });
          });
        } else {
          // ✅ If no image, delete student without fs.unlink()
          res.status(200).json({
            success: true,
            message: "Student deleted successfully",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Student not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});


// @desc Upload Single Image
// @route POST /api/v1/auth/upload
// @access Private

exports.uploadImage = asyncHandler(async (req, res, next) => {
  // // check for the file size and send an error message
  // if (req.file.size > process.env.MAX_FILE_UPLOAD) {
  //   return res.status(400).send({
  //     message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
  //   });
  // }

  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file" });
  }
  res.status(200).json({
    success: true,
    data: req.file.filename,
  });
});

// Get token from model , create cookie and send response
const sendTokenResponse = (Student, statusCode, res, role, fullName, image, email, contact, id) => {
  const token = Student.getSignedJwtToken();

  const options = {
    //Cookie will expire in 30 days
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Cookie security is false .if you want https then use this code. do not use in development time
  if (process.env.NODE_ENV === "proc") {
    options.secure = true;
  }
  //we have created a cookie with a token

  res
    .status(statusCode)
    .cookie("token", token, options) // key , value ,options
    .json({
      success: true,
      token,
      role,
      fullName, email, contact, id, image,

    });
};


