import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProject, fetchProjects } from "../../redux/Slice/projectSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Box, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";

const EditProject = () => {
    const { projectId } = useParams();
    console.log("this is id", projectId);
    const [showTeamLeaderForm, setShowTeamLeaderForm] = useState(false);
    const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);

    const dispatch = useDispatch();
    const [projectData, setProjectData] = useState(null);
    const { loading, error } = useSelector((state) => state.project);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await dispatch(fetchProjects()).unwrap();

                const project = result.find((p) => p._id === projectId);
                console.log("Found Project:", project);

                setProjectData(project);
            } catch (err) {
                console.error("Error fetching project:", err);
            }
        };

        getData();
    }, [dispatch, projectId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTeamLeaderChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            teamLeader: {
                ...projectData.teamLeader,
                [name]: value,
            },
        });
    };

    const handleTeamMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMembers = [...projectData.teamMembers];
        updatedMembers[index] = { ...updatedMembers[index], [name]: value };
        setProjectData({
            ...projectData,
            teamMembers: updatedMembers,
        });
    };

    const handleAddMember = () => {
        setProjectData({
            ...projectData,
            teamMembers: [...projectData.teamMembers, { name: "", task: "" }],
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Updated project data:", projectData);

        try {
            const resultAction = await dispatch(editProject({ id: projectId, updatedData: projectData }));
            if (editProject.fulfilled.match(resultAction)) {
                toast.success("Project updated successfully");
            } else {
                toast.error("failed! Please check your details.");
            }
        } catch (error) {
            toast.error("An error occurred during registration."); 
        }
    };

    if (loading) return <p style={{ color: "white" }}>Loading...</p>;
    if (error) return <p style={{ color: "white" }}>Error: {error}</p>;
    if (!projectData) return <p style={{ color: "white" }}>No project found with the given ID.</p>;

    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundColor: "#151845",
                padding: "2rem",
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
                    backgroundColor: "#151845",
                }}
            >
                <h2
                    style={{
                        color: "#DEDEDE",
                        marginBottom: "2rem",
                    }}
                >
                    Edit Project
                </h2>
                <form onSubmit={handleSubmit}>
                    <Row>
                        {/* Left Column */}
                        <Col xs={12} md={6}>
                            <TextField
                                label="Project ID"
                                name="id"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={projectData?.id || ""}
                                onChange={handleInputChange}
                                sx={{
                                    input: { color: "#DEDEDE" },
                                    label: { color: "#DEDEDE" },
                                }}
                            />
                            <TextField
                                label="Project Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={projectData?.name || ""}
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
                                value={projectData?.stack || ""}
                                onChange={handleInputChange}
                                sx={{
                                    input: { color: "#DEDEDE" },
                                    label: { color: "#DEDEDE" },
                                }}
                            />
                        </Col>

                        {/* Right Column */}
                        <Col xs={12} md={6}>
                            <TextField
                                label="Description"
                                name="description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                                margin="normal"
                                value={projectData?.description || ""}
                                onChange={handleInputChange}
                                InputProps={{
                                    style: { color: "#DEDEDE" },
                                }}
                                InputLabelProps={{
                                    style: { color: "#DEDEDE" },
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "1rem",
                                }}
                            >
                                <label style={{ color: "white" }}>Assigned to :</label>
                                <Button
                                    variant="outlined"
                                    style={{
                                        border: "1px solid #3487FF",
                                        borderRadius: "10px",
                                        padding: "0.5rem 1rem",
                                        color: "#DEDEDE",
                                    }}
                                    onClick={handleTeamLeaderClick}
                                >
                                    Team Leaders
                                </Button>
                                <Button
                                    variant="outlined"
                                    style={{
                                        border: "1px solid #3487FF",
                                        borderRadius: "10px",
                                        padding: "0.5rem 1rem",
                                        color: "#DEDEDE",
                                    }}
                                    onClick={handleTeamMemberClick}
                                >
                                    Team Members
                                </Button>
                            </div>
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
                                label="Team Leader Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={projectData?.teamLeader.name}
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
                                value={projectData?.teamLeader.task}
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
                            {projectData?.teamMembers.map((member, index) => (
                                <div key={index}>
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

                    {/* Submit Button */}
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <Button
                            type="submit"
                            style={{
                                padding: "0.5rem 2rem",
                                backgroundColor: "#3487FF",
                                color: "#FFF",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Box>
        </Container>
    );
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
};

export default EditProject;
