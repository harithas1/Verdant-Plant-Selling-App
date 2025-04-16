require("dotenv").config();
const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes")
const plantRoutes = require("./routes/plantsRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const cartRoutes = require("./routes/cartRoutes")

const app = express();

app.use(cors());

app.use(express.json());

// Add user routes
app.use("/api/auth", customerRoutes);
app.use("/plants", plantRoutes);
app.use("/category", categoryRoutes);
app.use("/cart",cartRoutes)



module.exports = app;
