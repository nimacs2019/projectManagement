import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignedProjects, editProject } from "../../redux/Slice/projectSlice";
import { Button } from "react-bootstrap";
import { Box, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";

const MyTasks = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.project);
    const [projectData, setProjectData] = useState([]);
    const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formData, setFormData] = useState({
        teamMembers: [{ name: "", task: "", userId: "" }],
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await dispatch(assignedProjects()).unwrap();
                setProjectData(result);
            } catch (err) {
                console.error("Error fetching projects:", err);
            }
        };

        getData();
    }, [dispatch]);

    const handleViewProject = (project) => {
        setSelectedProject(project);
    };

    const handleCloseDetails = () => {
        setSelectedProject(null);
    };

    const handleTeamMemberClick = () => {
        setShowTeamMemberForm(!showTeamMemberForm);
    };

    const handleCloseForm = () => {
        setShowTeamMemberForm(false);
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const resultAction = await dispatch(
    //             editProject({
    //                 id: selectedProject._id,
    //                 updatedData: { ...selectedProject, teamMembers: formData.teamMembers },
    //             })
    //         ).unwrap();

    //         console.log("Result action after unwrap:", resultAction);
    //         if (resultAction && resultAction.success) {
    //             toast.success("Project updated successfully");
    //         } else {
    //             toast.error("Failed to update the project. Please try again.");
    //             console.error("Error response:", resultAction);
    //         }
    //     } catch (error) {
    //         if (error.error) {
    //             toast.error(error.error);
    //         } else {
    //             toast.error("An unexpected error occurred.");
    //         }
    //         console.error("Caught error:", error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedTeamMembers = [
            ...selectedProject.teamMembers, 
            ...formData.teamMembers, 
        ];
    
        try {
            const resultAction = await dispatch(
                editProject({
                    id: selectedProject._id,
                    updatedData: { ...selectedProject, teamMembers: updatedTeamMembers },
                })
            ).unwrap();
    
            console.log("Result action after unwrap:", resultAction);
            if (resultAction ) {
                toast.success("Project updated successfully");
            } else {
                toast.error("Failed to update the project. Please try again.");
                console.error("Error response:", resultAction);
            }
        } catch (error) {
            if (error.error) {
                toast.error(error.error);
            } else {
                toast.error("An unexpected error occurred.");
            }
            console.error("Caught error:", error);
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: "20px", color: "#fff", minHeight: "100vh" }}>
            {selectedProject ? (
                <div style={{ padding: "20px", backgroundColor: "#1B1E57", color: "#fff" }}>
                    <h2>Project Details</h2>
                    <p>
                        <strong>Project Name:</strong> {selectedProject.name}
                    </p>
                    {/* Display Project Details */}
                    <div>
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
                            Add More Members
                        </Button>
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
                                <h4 style={{ color: "#DEDEDE" }}>Add Team Members</h4>
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
                                <Button
                                    onClick={handleSubmit}
                                    style={{
                                        border: "1px solid #3487FF",
                                        borderRadius: "10px",
                                        padding: "1rem 2rem",
                                        backgroundColor: "#3487FF",
                                        color: "#fff",
                                        marginTop: "1rem",
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        )}
                        <Button
                            onClick={handleCloseDetails}
                            style={{
                                border: "1px solid #3487FF",
                                borderRadius: "10px",
                                maxWidth: "100vw",
                                padding: "1rem 2rem",
                                textAlign: "center",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                marginTop: "1rem",
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Projects</h2>
                    <div>
                        {projectData.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => handleViewProject(project)}
                                style={{
                                    backgroundColor: "#1B1E57",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTasks;
