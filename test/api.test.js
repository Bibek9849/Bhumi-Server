const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Student = require("../model/student");
require("dotenv").config();

describe("👨‍🎓 Student Authentication API Tests", () => {
    let studentId;
    let token;

    beforeAll(async () => {
        await Student.deleteMany({}); // Clean database before tests
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Close DB connection after tests
    });

    test("✅ Should register a new student", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send({
                data: {
                    fullName: "Test Student",
                    email: "teststudent@example.com",
                    contact: "1234567890",
                    address: "Test Address",
                    password: "TestPassword123"
                }
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
    });

    test("✅ Should login the student and return a token", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({
                data: {
                    contact: "1234567890",
                    password: "TestPassword123"
                }
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.token).toBeDefined();
        token = res.body.token; // Store the token for protected routes
    });

    test("✅ Should retrieve all students", async () => {
        const res = await request(app)
            .get("/api/users/getAllStudents");

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });

    test("✅ Should fetch a single student by ID", async () => {
        // Ensure studentId is correctly set
        const students = await request(app).get("/api/users/getAllStudents");

        if (!students.body.data.length) {
            throw new Error("❌ No students found, test cannot continue!");
        }

        studentId = students.body.data[0]._id; // Store first student ID

        const res = await request(app).get(`/api/users/getMe`).set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("fullName");
    });


    test("✅ Should update the student profile", async () => {
        const res = await request(app)
            .put(`/api/users/updateUser/${studentId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fullName: "Updated Student"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.data.fullName).toBe("Updated Student");
    });

    test("✅ Should delete the student", async () => {
        if (!studentId) throw new Error("Student ID is undefined!");

        // Ensure admin privileges for deletion
        const res = await request(app)
            .delete(`/api/users/deleteStudent/${studentId}`)
            .set("Authorization", `Bearer ${token}`);

        console.log("Delete Response:", res.body); // Debugging log

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
    });

});
