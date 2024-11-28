// routes/authRoutes.js
const express = require("express");
const { addProject, getAllProjects } = require("../controllers/projectController");
const Projectrouter = express.Router();

Projectrouter.post("/api/add-project", addProject);
Projectrouter.get("/api/projects", getAllProjects);


module.exports = Projectrouter;
