const mongoose = require("mongoose");

// Destructure Schema and ObjectId from mongoose
const { Schema, model, Types } = mongoose;

// Define the project schema
const taskSchema = new Schema(
    {
        id: { type: String, required: true, unique: true }, // Unique identifier for the project
        projectId: { type: Types.ObjectId, ref: "Project" }, // Reference to the associated project
        title: { type: String, required: true }, // Title of the project
        description: { type: String, required: true }, // Description of the project
        status: { 
            type: String, 
            enum: ["Pending", "In Progress", "Completed"], // Allowed statuses
            required: true 
        },
        teamLeader: { type: Types.ObjectId, ref: "User", required: true }, // Reference to Team Leader
        assignedMembers: [
            { 
                userId: { type: Types.ObjectId, ref: "User", required: true }, // Member ID reference
                status: { 
                    type: String, 
                    enum: ["Pending", "In Progress", "Completed"], // Status for each member
                    required: true 
                },
            },
        ],
    },
    {
        timestamps: true, // Automatically manages `createdAt` and `updatedAt`
    }
);

// Create and export the Project model
const Task = model("Task", taskSchema);

module.exports = Task;
