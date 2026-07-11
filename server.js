const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
require("./config/db");
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
app.get("/cart", (req, res) => res.sendFile(path.join(__dirname, "views", "cart.html")));
app.get("/product", (req, res) => res.sendFile(path.join(__dirname, "views", "product.html")));
app.get("/checkout", (req, res) => res.sendFile(path.join(__dirname, "views", "checkout.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "views", "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "views", "register.html")));
app.get("/profile", (req, res) => res.sendFile(path.join(__dirname, "views", "profile.html")));

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("E-Commerce API is running..."));