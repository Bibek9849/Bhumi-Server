const cors = require("cors")
const dotenv = require("dotenv");

const express = require("express")
const connectDb = require("./config/db")
const UserRouter = require("./route/userRoute")
const CategoryRouter = require("./route/productCategoryRoute")
const ProductRouter = require("./route/productRoute")
const OrderRouter = require("./route/orderRoute")
const OrderDetailRouter = require("./route/orderDetailRoute")
const FeedbackRouter = require("./route/feedbackRoute")
const PaymentRouter = require("./route/paymentRoute")
const AuthRouter = require("./route/authRoute")
const auth = require("./route/student");

const path = require("path");
const app = express();

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions)); // Use the cors middleware with your options



// Load env file
dotenv.config({
    path: "./config/config.env",
});

connectDb();

app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/product", ProductRouter);
app.use("/api/order", OrderRouter);
app.use("/api/details", OrderDetailRouter);
app.use("/api/feedback", FeedbackRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/users", auth);
app.use(cors(corsOptions));
app.use("/product_type_images", express.static("product_type_images"))

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})