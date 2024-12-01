import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignedProjects, editProject, updateProjectStatus } from "../../redux/Slice/projectSlice";
import { Button } from "react-bootstrap";
import { Box, TextField } from "@mui/material";
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
        setShowTeamMemberForm(false);
    };

    const handleTeamMemberClick = () => {
        setShowTeamMemberForm((prev) => !prev);
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
            teamMembers: [...formData.teamMembers, { name: "", task: "", userId: "" }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTeamMembers = [
            ...selectedProject.teamMembers,
            ...formData.teamMembers.filter((member) => member.name || member.task || member.userId),
        ];

        try {
            const resultAction = await dispatch(
                editProject({
                    id: selectedProject._id,
                    updatedData: { ...selectedProject, teamMembers: updatedTeamMembers },
                })
            ).unwrap();

            if (resultAction) {
                toast.success("Project updated successfully");
                setProjectData((prev) =>
                    prev.map((project) =>
                        project._id === selectedProject._id
                            ? { ...project, teamMembers: updatedTeamMembers }
                            : project
                    )
                );
                setShowTeamMemberForm(false);
            } else {
                toast.error("Failed to update the project. Please try again.");
            }
        } catch (error) {
            toast.error(error?.error || "An unexpected error occurred.");
        }
    };

    const handleStatusChange = async (projectId, newStatus) => {
        try {
            const resultAction = await dispatch(updateProjectStatus({ projectId, status: newStatus })).unwrap();

            if (resultAction) {
                setProjectData((prevData) =>
                    prevData.map((project) =>
                        project._id === projectId ? { ...project, status: newStatus } : project
                    )
                );
                toast.success("Project status updated successfully");
            } else {
                toast.error("Failed to update project status.");
            }
        } catch (error) {
            toast.error(error.message || "Error updating status");
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
                    <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                        <h5>Team Members :</h5>
                        <table style={tableStyles}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>S.No</th>
                                    <th style={tableHeaderStyle}>User ID</th>
                                    <th style={tableHeaderStyle}>Name</th>
                                    <th style={tableHeaderStyle}>Task</th>
                                    <th style={tableHeaderStyle}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProject.teamMembers.map((member, index) => (
                                    <tr key={index} style={rowStyle}>
                                        <td style={tableCellStyle}>{index + 1}</td>
                                        <td style={tableCellStyle}>{member.userId || "N/A"}</td>
                                        <td style={tableCellStyle}>{member.name || "N/A"}</td>
                                        <td style={tableCellStyle}>{member.task || "N/A"}</td>
                                        <td style={tableCellStyle}>{member.status || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Button style={buttonStyle} onClick={handleTeamMemberClick}>
                            Add More Members
                        </Button>
                        {showTeamMemberForm && (
                            <Box sx={formBoxStyle}>
                                <h4>Add Team Members</h4>
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
                                        />
                                        <TextField
                                            label="Member Name"
                                            name="name"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={member.name}
                                            onChange={(e) => handleTeamMemberChange(index, e)}
                                        />
                                        <TextField
                                            label="Task"
                                            name="task"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={member.task}
                                            onChange={(e) => handleTeamMemberChange(index, e)}
                                        />
                                    </div>
                                ))}
                                <Button style={buttonStyle} onClick={handleAddMember}>
                                    Add Another Member
                                </Button>
                                <Button style={buttonStyle} onClick={handleSubmit}>
                                    Save Changes
                                </Button>
                            </Box>
                        )}
                        <Button style={buttonStyle} onClick={handleCloseDetails}>
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Projects</h2>
                    <div>
                        {projectData.map((project) => (
                            <div key={project.id} style={projectCardStyle}>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <p>Status: {project.status}</p>
                                {/* <p onClick={() => handleViewProject(project)}>View More</p> */}
                                <select
                                    value={project.status || ""}
                                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                                    style={selectStyle}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#181B4D",
    color: "#DEDEDE",
    textAlign: "left",
};

const tableHeaderStyle = {
    padding: "10px",
    border: "1px solid #3487FF",
    backgroundColor: "#1B1E57",
    color: "#fff",
    textAlign: "center",
};

const tableCellStyle = {
    padding: "10px",
    border: "1px solid #3487FF",
    textAlign: "center",
};

const rowStyle = { borderBottom: "1px solid #3487FF" };

const buttonStyle = {
    border: "1px solid #3487FF",
    borderRadius: "10px",
    padding: "1rem 2rem",
    backgroundColor: "#3487FF",
    color: "#fff",
    margin: "1rem 0",
};

const projectCardStyle = {
    backgroundColor: "#1B1E57",
    padding: "15px",
    borderRadius: "10px",
    margin: "15px 0",
};

const formBoxStyle = {
    margin: "20px 0",
    padding: "20px",
    backgroundColor: "#1B1E57",
    borderRadius: "10px",
};

const selectStyle = {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "10px",
};

export default MyTasks;
