const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { logger, logRequest } = require("./logger");
const orderModel = require("./schema/orders");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(logRequest);

const PORT = process.env.PORT;

// MongoDB
logger.info(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => logger.info("Connected to Database"))
    .catch((err) => logger.error(err));

// Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    confirmPassword: String,
    image: String,
});

const userModel = mongoose.model("user", userSchema);

// Api
app.get("/", (req, res) => {
    res.send("Server is running");
});

// api login
app.post("/login", async (req, res) => {
    try {
        logger.info(req.body); // log the request body to the console
        const { email } = req.body; // extract the email from the request body using destructuring

        const result = await userModel.findOne({ email: email }).exec();

        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };
            logger.info(dataSend);
            res.send({ message: "Login successfully", alert: true, data: dataSend });
        } else {
            res.send({ message: "Email not registered, please sign up", alert: false });
        }

    } catch (err) {
        logger.error(err); // log any errors to the console
        res.status(500).send("Server Error"); // send an error response to the client
    }
});

// api signup
app.post("/signup", async (req, res) => {
    try {
        logger.info(req.body); // log the request body to the console
        const { email } = req.body; // extract the email from the request body using destructuring

        const result = await userModel.findOne({ email: email }).exec();

        if (result) {
            res.send({ message: "Email already exists", alert: false });
        } else {
            const data = new userModel(req.body);
            await data.save();
            res.send({ message: "Successfully signed up", alert: true });
        }
    } catch (err) {
        logger.error(err); // log any errors to the console
        res.status(500).send("Server Error"); // send an error response to the client
    }
});

// product section
const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String
});

const productModel = mongoose.model("product", schemaProduct);

// save product api
app.post("/uploadProduct", async (req, res) => {
    try {
        logger.info(req.body);
        const data = new productModel(req.body);
        await data.save();
        res.send({ message: "Upload successfully" });
    } catch (err) {
        logger.error(err);
        res.status(500).send("Server Error");
    }
});

// get products
app.get("/product", async (req, res) => {
    try {
        const data = await productModel.find({});
        res.send(JSON.stringify(data));
    } catch (err) {
        logger.error(err);
        res.status(500).send("Server Error");
    }
});

// order section
// create order
app.post("/createOrder", async (req, res) => {
    try {
        logger.info(req.body);

        // Check for duplicate order
        const existingOrder = await orderModel.findOne({
            userId: req.body.userId,
            "products.productId": { $in: req.body.products.map(product => product.productId) },
            totalAmount: req.body.totalAmount,
            "deliveryAddress.name": req.body.deliveryAddress.name,
            "deliveryAddress.number": req.body.deliveryAddress.number,
            "deliveryAddress.address": req.body.deliveryAddress.address
        });

        if (existingOrder) {
            return res.status(400).send({ message: "Duplicate order detected", alert: false });
        }

        const data = new orderModel(req.body);
        await data.save();
        res.send({ message: "Order created successfully", order: data });
    } catch (err) {
        logger.error("Error creating order:", err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

// get orders
app.get("/orders", async (req, res) => {
    try {
        const data = await orderModel.find({});
        res.send({ message: "Orders fetched successfully", orders: data });
    } catch (err) {
        logger.error("Error fetching orders:", err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

// update order status
app.put("/updateOrder/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        const data = await orderModel.findByIdAndUpdate(id, { orderStatus }, { new: true });
        if (!data) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.send({ message: "Order status updated successfully", order: data });
    } catch (err) {
        logger.error("Error updating order status:", err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

// delete order
app.delete("/deleteOrder/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await orderModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.send({ message: "Order deleted successfully" });
    } catch (err) {
        logger.error("Error deleting order:", err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

app.listen(PORT, () => {
    logger.info(`Server is running at ${PORT}`);
});

app.get("/test", (req, res) => {
    res.send("Test working");
});