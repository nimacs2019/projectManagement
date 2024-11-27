const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const projectSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["Pending", "In Progress", "Completed"], required: true },
        tasks: [{ type: Types.ObjectId, ref: "Task" }],
        teamLeader: { type: Types.ObjectId, ref: "User" },
        teamMembers: [{ type: Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);

const Project = model("Project", projectSchema);

module.exports = Project;
