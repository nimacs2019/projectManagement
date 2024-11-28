const Project = require("../models/Project ");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addProject = async (req, res) => {
    try {
        const { projectId, projectname, stack, description, teamLeader, teamMembers } = req.body;

        // Construct a new project document
        const newProject = new Project({
            id: projectId,
            name: projectname,
            stack,
            description,
            teamLeader,
            teamMembers,
            status: "Pending",
        });

        // Save the project to the database
        await newProject.save();

        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ error: "Error creating project" });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects", error: error.message });
    }
};
