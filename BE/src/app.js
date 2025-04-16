require("dotenv").config();
const express = require("express");
const cors = require("cors");

const customer_Routes = require("./routes/customerRoutes")

const app = express();

app.use(cors());

app.use(express.json());

// Add user routes
app.use("/api/auth", customer_Routes);



module.exports = app;
