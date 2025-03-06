const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const connectDb = require("./config/db");

// Import Routers
const UserRouter = require("./route/userRoute");
const CategoryRouter = require("./route/productCategoryRoute");
const ProductRouter = require("./route/productRoute");
const OrderRouter = require("./route/orderRoute");
const OrderDetailRouter = require("./route/orderDetailRoute");
const FeedbackRouter = require("./route/feedbackRoute");
const PaymentRouter = require("./route/paymentRoute");
const AuthRouter = require("./route/authRoute");
const auth = require("./route/users");

const app = express();

// 🔹 Load environment variables
dotenv.config({ path: "./config/config.env" });

// 🔹 Connect to Database
connectDb();

// 🔹 Define CORS options
const corsOptions = {
    credentials: true,
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

// 🔹 Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Static File Serving
app.use("/product_type_images", express.static(path.join(__dirname, "product_type_images")));
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

// 🔹 Routes
app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/product", ProductRouter);
app.use("/api/order", OrderRouter);
app.use("/api/details", OrderDetailRouter);
app.use("/api/feedback", FeedbackRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/users", auth);

// 🔹 Start Server (only if not in test mode)
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

// ✅ Export app for testing
module.exports = app;
