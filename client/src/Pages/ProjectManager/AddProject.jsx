import { Box, TextareaAutosize, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../redux/Slice/projectSlice";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AddProject = () => {
    const [showTeamLeaderForm, setShowTeamLeaderForm] = useState(false);
    const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.project);

    const [formData, setFormData] = useState({
        projectId: "",
        projectname: "",
        stack: "",
        description: "",
        teamLeader: { name: "", task: "", userId: "" },
        teamMembers: [{ name: "", task: "", userId: "" }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTeamLeaderChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            teamLeader: {
                ...formData.teamLeader,
                [name]: value,
            },
        });
    };

    const handleTeamMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMembers = [...formData.teamMembers];
        updatedMembers[index] = { ...updatedMembers[index], [name]: value };
        setFormData({
            ...formData,
            teamMembers: updatedMembers,
        });
    };

    const handleAddMember = () => {
        setFormData({
            ...formData,
            teamMembers: [...formData.teamMembers, { name: "", task: "" }],
        });
    };

    const handleTeamLeaderClick = () => {
        setShowTeamLeaderForm(!showTeamLeaderForm);
        setShowTeamMemberForm(false);
    };

    const handleTeamMemberClick = () => {
        setShowTeamMemberForm(!showTeamMemberForm);
        setShowTeamLeaderForm(false);
    };

    const handleCloseForm = () => {
        setShowTeamLeaderForm(false);
        setShowTeamMemberForm(false);
    };

    const handleAdd = async () => {
        const projectData = {
            ...formData,
        };

        try {
            const resultAction = await dispatch(addProject(projectData));
            if (addProject.fulfilled.match(resultAction)) {
                toast.success("Project added");
            } else {
                toast.error("failed! Please check your details.");
            }
        } catch (error) {
            toast.error("An error occurred during registration."); // Add error handling message
        }
    };

    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundColor: "#151845",
            }}
        >
            <Box
                sx={{
                    border: "1px solid #3487FF",
                    borderRadius: "16px",
                    maxWidth: "100vw",
                    padding: "2rem",
                    textAlign: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                <h2
                    style={{
                        color: "#DEDEDE",
                        backgroundColor: "#151845",
                    }}
                >
                    Add New Project
                </h2>
                <Row>
                    <Col xs={12} md={6}>
                        <TextField
                            label="Project ID"
                            name="projectId"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.projectId}
                            onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                        <TextField
                            label="Project Name"
                            name="projectname"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.projectname}
                            onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                        <TextField
                            label="Stack"
                            name="stack"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.stack}
                            onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <TextField
                            label="Description"
                            name="description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            margin="normal"
                            value={formData.description}
                            onChange={handleInputChange}
                            InputProps={{
                                style: { color: "#DEDEDE" },
                            }}
                            InputLabelProps={{
                                style: { color: "#DEDEDE" },
                            }}
                        />
                        <Col xs="auto" style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                            <label style={{ color: "white" }}>Assigned to :</label>
                            <Button
                                style={{
                                    border: "1px solid #3487FF",
                                    borderRadius: "10px",
                                    maxWidth: "100vw",
                                    padding: "1rem 2rem",
                                    textAlign: "center",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                }}
                                onClick={handleTeamLeaderClick}
                            >
                                Team Leaders
                            </Button>
                            <Button
                                style={{
                                    border: "1px solid #3487FF",
                                    borderRadius: "10px",
                                    maxWidth: "100vw",
                                    padding: "1rem 2rem",
                                    textAlign: "center",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                }}
                                onClick={handleTeamMemberClick}
                            >
                                Team Members
                            </Button>
                        </Col>
                    </Col>
                </Row>

                {/* Team Leader Form */}
                {showTeamLeaderForm && (
                    <Box
                        sx={{
                            marginTop: "1rem",
                            padding: "1rem",
                            border: "1px solid #3487FF",
                            borderRadius: "10px",
                            backgroundColor: "#181B4D",
                        }}
                    >
                        <div className="d-flex justify-content-between">
                            <h4 style={{ color: "#DEDEDE" }}>Add Team Leader</h4>
                            <CheckCircleIcon
                                style={{ color: "#DEDEDE", fontSize: "35", cursor: "pointer" }}
                                onClick={handleCloseForm}
                            />
                        </div>
                        <TextField
                            label="User ID"
                            name="userId"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.teamLeader.userId}
                            onChange={handleTeamLeaderChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                        <TextField
                            label="Team Leader Name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.teamLeader.name}
                            onChange={handleTeamLeaderChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                        <TextField
                            label="Task"
                            name="task"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.teamLeader.task}
                            onChange={handleTeamLeaderChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                    </Box>
                )}

                {/* Team Member Form */}
                {showTeamMemberForm && (
                    <Box
                        sx={{
                            marginTop: "1rem",
                            padding: "1rem",
                            border: "1px solid #3487FF",
                            borderRadius: "10px",
                            backgroundColor: "#181B4D",
                        }}
                    >
                        <div className="d-flex justify-content-between">
                            <h4 style={{ color: "#DEDEDE" }}>Add Team Members</h4>
                            <CheckCircleIcon
                                style={{ color: "#DEDEDE", fontSize: "35", cursor: "pointer" }}
                                onClick={handleCloseForm}
                            />
                        </div>
                        {formData.teamMembers.map((member, index) => (
                            <div key={index}>
                                <TextField
                                    label="User ID"
                                    name="userId"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={member.userId}
                                    onChange={(e) => handleTeamMemberChange(index, e)}
                                    sx={{
                                        input: { color: "#DEDEDE" },
                                        label: { color: "#DEDEDE" },
                                    }}
                                />
                                <TextField
                                    label="Member Name"
                                    name="name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={member.name}
                                    onChange={(e) => handleTeamMemberChange(index, e)}
                                    sx={{
                                        input: { color: "#DEDEDE" },
                                        label: { color: "#DEDEDE" },
                                    }}
                                />
                                <TextField
                                    label="Task"
                                    name="task"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={member.task}
                                    onChange={(e) => handleTeamMemberChange(index, e)}
                                    sx={{
                                        input: { color: "#DEDEDE" },
                                        label: { color: "#DEDEDE" },
                                    }}
                                />
                            </div>
                        ))}
                        <Button
                            style={{
                                border: "1px solid #3487FF",
                                borderRadius: "10px",
                                padding: "1rem 2rem",
                                backgroundColor: "#3487FF",
                                color: "#fff",
                                marginTop: "1rem",
                            }}
                            onClick={handleAddMember}
                        >
                            Add Another Member
                        </Button>
                    </Box>
                )}

                <Button
                    style={{
                        border: "1px solid #3487FF",
                        borderRadius: "10px",
                        maxWidth: "100vw",
                        padding: "1rem 2rem",
                        textAlign: "center",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        marginTop: "2rem",
                    }}
                    onClick={handleAdd}
                >
                    Add Project
                </Button>
            </Box>
        </Container>
    );
};

export default AddProject;
