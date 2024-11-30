// routes/authRoutes.js
const express = require("express");
const { loginUser, register, getTeamLeaders, getTeamMembers } = require("../controllers/authController");
const Authrouter = express.Router();

Authrouter.post("/api/register", register);
Authrouter.post("/api/login", loginUser);
Authrouter.get("/api/leaders", getTeamLeaders);
Authrouter.get("/api/members", getTeamMembers);

module.exports = Authrouter;
