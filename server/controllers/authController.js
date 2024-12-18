const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    console.log(req.body);

    try {
        // Allow registration only for students
        if (role == "") {
            return res.status(403).json({ message: "Registration is not allowed" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a unique userId

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Save user to database
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            name: newUser.name, // Optionally return other user details
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login user (for all roles)
exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    console.log(req.body);

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        let isMatch = false;

        // Check password based on role
        if (["projectmanager", "teamleader", "teammember"].includes(user.role)) {
            isMatch = await bcrypt.compare(password, user.password);
            console.log(`Comparing password: '${password}' with '${user.password}' => Match: ${isMatch}`);
        } else {
            return res.status(400).json({ message: "Invalid role or credentials" });
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        console.log("USER", user);

        // Create JWT token
        const token = jwt.sign({ userId: user._id, role: user.role, empID: user.userId }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        console.log("this is my token", token);

        res.json({ token, role: user.role, name: user.name, empID: user.userId });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.logoutUser = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: "Token is missing" });
    }

    const token = authHeader.split(" ")[1];
    tokenBlacklist.add(token); // Add the token to the blacklist

    res.status(200).json({ message: "Logged out successfully" });
};

exports.getTeamLeaders = async (req, res) => {
    try {
        const teamLeaders = await User.find({ role: "teamleader" });

        if (teamLeaders.length === 0) {
            return res.status(404).json({ message: "No team leaders found" });
        }

        res.json(teamLeaders);
    } catch (error) {
        console.error("Error fetching team leaders:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all team members
exports.getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await User.find({ role: "teammember" });

        if (teamMembers.length === 0) {
            return res.status(404).json({ message: "No team members found" });
        }

        res.json(teamMembers);
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({ message: "Server error" });
    }
};
