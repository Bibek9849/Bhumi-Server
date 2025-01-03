const express = require("express")
const connectDb = require("./config/db")
const UserRouter = require("./route/userRoute")
const CategoryRouter = require("./route/productCategoryRoute")
const TypeRouter = require("./route/productTypeRoute")
const ProductRouter = require("./route/productRoute")
const OrderRouter = require("./route/orderRoute")


const app = express();

connectDb();

app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/type", TypeRouter);
app.use("/api/product", ProductRouter);
app.use("/api/order", OrderRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})