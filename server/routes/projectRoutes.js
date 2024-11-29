// routes/authRoutes.js
const express = require("express");
const { addProject, getAllProjects, editProject, deleteProject } = require("../controllers/projectController");
const Projectrouter = express.Router();

Projectrouter.post("/api/add-project", addProject);
Projectrouter.get("/api/projects", getAllProjects);
Projectrouter.put("/api/projects/:projectId", editProject);
Projectrouter.delete("/api/projects/:projectId", deleteProject);


module.exports = Projectrouter;
