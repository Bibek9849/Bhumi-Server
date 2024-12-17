const express = require("express")
const connectDb = require("./config/db")
const CustomerRouter = require("./route/customerRoute")
const CategoryRouter = require("./route/productCategoryRoute")

const app = express();

connectDb();

app.use(express.json());
app.use("/api/customer", CustomerRouter);
app.use("/api/category", CategoryRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})