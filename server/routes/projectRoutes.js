// routes/authRoutes.js
const express = require("express");
const {
    addProject,
    getAllProjects,
    editProject,
    deleteProject,
    getOwnProjects,
    updateProjectStatus,
} = require("../controllers/projectController");
const authenticateToken = require("../middleware/auth");
const Projectrouter = express.Router();

Projectrouter.post("/api/add-project", authenticateToken, addProject);
Projectrouter.get("/api/projects", getAllProjects);
Projectrouter.put("/api/projects/:projectId?", editProject);
Projectrouter.delete("/api/projects/:projectId", deleteProject);
Projectrouter.get("/api/projects/own-projects", authenticateToken, getOwnProjects);
Projectrouter.put("/api/projects/:id/status", updateProjectStatus);
module.exports = Projectrouter;
