const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const memberSchema = new Schema(
    {
        userId:{ type: String,  },
        name: { type: String,  },
        task: { type: String,  },
        status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    },
    { _id: false }
);

const projectSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        stack: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
        teamLeader: memberSchema,
        teamMembers: [memberSchema],
    },
    {
        timestamps: true,
    }
);

const Project = model("Project", projectSchema);

module.exports = Project;
