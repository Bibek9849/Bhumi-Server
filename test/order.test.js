const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const ProductCategory = require("../model/productCategory");

describe("📂 Product Category API Tests", () => {
    let categoryId;

    beforeAll(async () => {
        await ProductCategory.deleteMany({}); // Clear database before tests
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Close DB connection after tests
    });

    test("✅ Should create a new product category", async () => {
        const res = await request(app)
            .post("/api/category/save")
            .send({
                data: {
                    name: "Electronics",
                    description: "Category for electronic devices"
                }
            });

        console.log("📂 Create Category Response:", res.body); // Debugging log

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("_id");

        // ✅ Store categoryId for later tests
        categoryId = res.body._id;
        if (!categoryId) {
            throw new Error("❌ Category creation failed, no ID returned!");
        }
    });

    test("✅ Should retrieve all product categories", async () => {
        const res = await request(app).get("/api/category");

        console.log("📂 Get All Categories Response:", res.body); // Debugging log

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("✅ Should fetch a single product category by ID", async () => {
        if (!categoryId) throw new Error("❌ Category ID is undefined!");

        const res = await request(app).get(`/api/category/${categoryId}`);

        console.log("📂 Fetch Category Response:", res.body); // Debugging log

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name", "Electronics");
    });

    test("✅ Should update a product category", async () => {
        if (!categoryId) throw new Error("❌ Category ID is undefined!");

        const res = await request(app)
            .put(`/api/category/${categoryId}`)
            .send({
                name: "Updated Electronics",
                description: "Updated category for electronic devices"
            });

        console.log("📂 Update Category Response:", res.body); // Debugging log

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("name", "Updated Electronics");
    });

    test("✅ Should delete the product category", async () => {
        if (!categoryId) throw new Error("❌ Category ID is undefined!");

        const res = await request(app).delete(`/api/category/${categoryId}`);

        console.log("📂 Delete Category Response:", res.body); // Debugging log

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBe("Data Deleted");
    });
});
