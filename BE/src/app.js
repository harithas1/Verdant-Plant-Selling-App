require("dotenv").config();
const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes")
const plantRoutes = require("./routes/plantsRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const cartRoutes = require("./routes/cartRoutes")
const reviewRoutes= require("./routes/reviewRoutes")
const orderRoutes= require("./routes/orderRoutes")
const paymentRoutes = require("./routes/razorpayRotes")


const app = express();

app.use(cors());

// -----------------------------------------------
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// -----------------------------------------------------------

app.use(express.json());


app.use("/api/auth", customerRoutes);
app.use("/plants", plantRoutes);
app.use("/category", categoryRoutes);
app.use("/cart",cartRoutes)
app.use("/reviews",reviewRoutes)
app.use("/payment",paymentRoutes)
app.use("/orders", orderRoutes);



module.exports = app;
