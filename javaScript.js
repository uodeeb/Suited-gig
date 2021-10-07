const express = require("express");
const app = new express();
const http = require("http");
const fs = require("fs");
const path = require('path');
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require('morgan');

// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");
// const producthRoute = require("./routes/product");
// const orderhRoute = require("./routes/order");
// const carthRoute = require("./routes/cart");
// const register = require("./models/User")


app.set('view engine', 'ejs');


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MDB connection successfull!"))
    .catch((err) => {
        console.log(err);
    })

app.use(express.json());

app.use('public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// app.use("/API/products", producthRoute);
// app.use("/API/auth", authRoute);
// app.use("/API/users", userRoute);
// app.use("/API/orders", orderhRoute);
// app.use("/API/carts", carthRoute);




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.listen( 5000,'localhost' ,() => {
    console.log("server is running !")
});