const mongoose = require("mongoose");

// Function to generate custom userId based on role
const generateCustomUserId = (name) => {
    const formattedRole = name.toLowerCase().replace(/\s+/g, ""); // Remove spaces and lowercase
    const uniqueNumber = Math.floor(100 + Math.random() * 900); // Generate random 3-digit number
    return `${formattedRole}${uniqueNumber}`; // Combine role and number
};

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
        role: {
            type: String,
            enum: ["projectmanager", "teamleader", "teammember"],
            required: [true, "Please add a role"],
        },
        assignedProjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project",
            },
        ],
        assignedTasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    { timestamps: true }
);

// Pre-save hook to generate userId if not provided
userSchema.pre("save", async function (next) {
    if (!this.userId) {
        console.log("Generating userId for user with role:", this.name);  // Add logging for debugging
        let isUnique = false;
        while (!isUnique) {
            const potentialUserId = generateCustomUserId(this.name);
            console.log("Generated userId:", potentialUserId);  // Log the generated userId
            // Check if userId already exists in the database
            const existingUser = await mongoose.models.User.findOne({ userId: potentialUserId });
            if (!existingUser) {
                this.userId = potentialUserId;  // Set the unique userId
                console.log("userId assigned:", this.userId);  // Log when userId is assigned
                isUnique = true;
            }
        }
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
