const asyncHandler = require("../middleware/async");
const Student = require("../model/student");
const path = require("path");
const fs = require("fs");
const student = require("../model/student");

// @desc    Get all students
// @route   GET /api/v1/students
// @access  Private

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



exports.updateStudent = asyncHandler(async (req, res, next) => {
  const user = req.body;
  const student = await Student.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
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
  console.log(req.params.id);
  Student.findByIdAndDelete(req.params.id)
    .then((student) => {
      if (student != null) {
        var imagePath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          student.image
        );

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({
            success: true,
            message: "Student deleted successfully",
          });
        });
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
