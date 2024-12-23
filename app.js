const express = require("express")
const connectDb = require("./config/db")
const UserRouter = require("./route/userRoute")




const app = express();

connectDb();

app.use(express.json());
app.use("/api/user", UserRouter);


const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})