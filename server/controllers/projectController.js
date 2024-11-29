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

exports.editProject = async (req, res) => {
    console.log("hellllllo...............");
    
    try {
        const { projectId } = req.params;
        const { projectname, stack, description, teamLeader, teamMembers, status } = req.body;

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId }, 
            {
                name: projectname,
                stack,
                description,
                teamLeader,
                teamMembers,
                status,
            },
            { new: true } 
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Error updating project" });
    }
};

exports.deleteProject = async (req, res) => {
    console.log("Deleting project...");

    try {
        const { projectId } = req.params;

        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Error deleting project" });
    }
};