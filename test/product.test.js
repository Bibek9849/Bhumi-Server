const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Order = require("../model/order");

describe("Order API Tests", () => {
    let orderId;
    const userId = "65f8a56a8a23c91e5c2a1234";
    const cartItems = [
        { _id: "65f8a56a8a23c91e5c2b5678", quantity: 2, price: 200 },
        { _id: "65f8a56a8a23c91e5c2b6789", quantity: 1, price: 100 }
    ];

    beforeAll(async () => {
        await Order.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Should create a new order", async () => {
        const res = await request(app)
            .post("/api/order")
            .send({
                data: {
                    userId,
                    orderDate: "2024-03-01",
                    totalPrice: 500,
                    totalQuantity: 3,
                    cart: cartItems
                }
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("_id");

        orderId = res.body._id;
        if (!orderId) throw new Error("Order creation failed, no ID returned!");
    });

    test("Should retrieve all orders", async () => {
        const res = await request(app).get("/api/order");

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("Should fetch a single order by ID", async () => {
        if (!orderId) throw new Error("Order ID is undefined!");

        const res = await request(app).get(`/api/order/${orderId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("userId", userId);
    });

    test("Should update an order", async () => {
        if (!orderId) throw new Error("Order ID is undefined!");

        const res = await request(app)
            .put(`/api/order/${orderId}`)
            .send({ status: "Shipped" });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("status", "Shipped");
    });

    test("Should delete the order", async () => {
        if (!orderId) throw new Error("Order ID is undefined!");

        const res = await request(app).delete(`/api/order/${orderId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBe("Data Deleted");
    });
});
