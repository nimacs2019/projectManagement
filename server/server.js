
const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv");
const cors = require("cors");


const Authrouter = require("./routes/authRoutes");

dotenv.config();

// Initialize Express
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,PUT,POST,DELETE,PATCH",
        credentials: true,
    })
);

// Define Routes
app.use("/", Authrouter);

// Example of a protected route
const auth = require("./middleware/auth");

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
