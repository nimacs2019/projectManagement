// routes/authRoutes.js
const express = require("express");
const { loginUser, register } = require("../controllers/authController");
const Authrouter = express.Router();

Authrouter.post("/api/register", register);
Authrouter.post("/api/login", loginUser);

module.exports = Authrouter;
