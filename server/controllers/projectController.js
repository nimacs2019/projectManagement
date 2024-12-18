const Project = require("../models/Project ");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

exports.addProject = async (req, res) => {
    console.log("..........req for new project........", req.body);

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
    console.log("Edit project function invoked...");
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

    try {
        const projectId = req.params.projectId || req.body.projectId;
        console.log("Extracted projectId:", projectId);

        // Validate projectId
        if (!projectId) {
            console.log("Project ID is missing");
            return res.status(400).json({ error: "Project ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            console.log("Invalid Project ID format");
            return res.status(400).json({ error: "Invalid Project ID format" });
        }

        const projectObjectId = new mongoose.Types.ObjectId(projectId);
        console.log("Valid Project ObjectId:", projectObjectId);

        // Destructure additional fields from the body
        const { projectname, stack, description, teamLeader, teamMembers, status } = req.body;

        // Prepare the updated project object (including status)
        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectObjectId },
            {
                name: projectname,
                stack,
                description,
                teamLeader,
                teamMembers,
                status, // Include status in the update
            },
            { new: true } // Returns the updated project
        );

        // If the project doesn't exist, return an error
        if (!updatedProject) {
            console.log("Project not found");
            return res.status(404).json({ error: "Project not found" });
        }

        console.log("Project updated successfully:", updatedProject);
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

exports.getOwnProjects = async (req, res) => {
    console.log("this is me ", req.user);

    try {
        const empID = req.user.empID;
        // const projects = await Project.find({ "teamLeader.userId": empID });
        const projects = await Project.find({
            $or: [
                { "teamLeader.userId": empID }, // User is a team leader
                { "teamMembers.userId": empID }, // User is a team member
            ],
        });
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateProjectStatus = async (req, res) => {
    const { id } = req.params; // Extract ID from URL params
    const { status } = req.body; // Extract status from the request body

    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

    if (!id || !status) {
        return res.status(400).json({ message: "Project ID and status are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Project ID format" });
    }

    try {
        const project = await Project.findOneAndUpdate(
            { _id: id },
            { $set: { status } },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project status updated successfully", project });
    } catch (error) {
        console.error("Error updating project status:", error);
        res.status(500).json({ message: "Server error" });
    }
};

