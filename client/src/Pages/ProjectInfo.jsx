import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteProject, fetchProjects } from "../redux/Slice/projectSlice";
import { toast } from "react-toastify";

const ProjectInfo = () => {
    const [projectData, setProjectData] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);
    const [PMProjectView, setPMProjectView] = useState(role === "projectmanager");

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.project);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await dispatch(fetchProjects()).unwrap(); //
                setProjectData(result); // Set local state with fetched data
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

    const handleEditProject = (projectId) => {
        navigate(`/${role}/edit-project/${projectId}`);
    };

    const handleDeleteProject = async (id) => {
        try {
            const resultAction = await dispatch(deleteProject(id));
            if (deleteProject.fulfilled.match(resultAction)) {
                toast.success("Project deleted successfully");
                setProjectData((prev) => prev.filter((proj) => proj._id !== id));
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("An error occurred while deleting the project");
        }
    };

    // console.log("project data", projectData);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div style={{ padding: "20px", color: "#fff", minHeight: "100vh" }}>
            {/* Title Section */}

            <div>
                {selectedProject ? (
                    <div style={{ padding: "20px", backgroundColor: "#1B1E57", color: "#fff" }}>
                        <h2>Project Details</h2>
                        <p>
                            <strong>Project Name:</strong> {selectedProject.name}
                        </p>
                        <p>
                            <strong>Project ID:</strong> {selectedProject.id}
                        </p>
                        <p>
                            <strong>Stack:</strong> {selectedProject.stack}
                        </p>
                        <p>
                            <strong>Description:</strong> {selectedProject.description}
                        </p>
                        <p>
                            <strong>Status:</strong> {selectedProject.status}
                        </p>
                        <p>
                            <strong>Team Leader:</strong> {selectedProject.teamLeader.name}
                        </p>
                        <p>
                            <strong>Team Members:</strong>
                        </p>
                        <ul>
                            {selectedProject.teamMembers.map((member, idx) => (
                                <li key={idx}>
                                    {member.name} - Task: {member.task} - Status: {member.status}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleCloseDetails}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <h1 style={{ margin: 0 }}>Project Information</h1>
                            <NavLink
                                to={`/${role}/add-projects`}
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                {PMProjectView && (
                                    <button
                                        style={{
                                            backgroundColor: "#007bff",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            padding: "10px 20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Add New Project
                                    </button>
                                )}
                            </NavLink>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    backgroundColor: "#1B1E57",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: "#007bff",
                                            color: "#fff",
                                            textAlign: "left",
                                        }}
                                    >
                                        <th style={tableHeaderStyle}>Sl. No</th>
                                        <th style={tableHeaderStyle}>Project Name</th>
                                        <th style={tableHeaderStyle}>Project ID</th>
                                        <th style={tableHeaderStyle}>Team Leader</th>
                                        <th style={tableHeaderStyle}>Status</th>
                                        {PMProjectView && <th style={tableHeaderStyle}>Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectData.map((project, index) => (
                                        <tr key={project._id} style={{ borderBottom: "1px solid #444", color: "#ddd" }}>
                                            <td style={tableCellStyle}>{index + 1}</td>
                                            <td style={tableCellStyle}>{project.name}</td>
                                            <td style={tableCellStyle}>{project.id}</td>
                                            <td style={tableCellStyle}>{project.teamLeader.name}</td>
                                            <td style={tableCellStyle}>{project.status}</td>
                                            {PMProjectView && (
                                                <td style={tableCellStyle}>
                                                    <span style={iconStyle} onClick={() => handleViewProject(project)}>
                                                        👁️
                                                    </span>
                                                    <span style={iconStyle} onClick={() => handleEditProject(project._id)}>
                                                        ✏️
                                                    </span>
                                                    <span style={iconStyle} onClick={() => handleDeleteProject(project._id)}>
                                                        🗑️
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// Table Styles
const tableHeaderStyle = {
    padding: "15px 35px",
    fontWeight: "bold",
    textTransform: "uppercase",
};

const tableCellStyle = {
    padding: "15px 5px",
    textAlign: "center",
};

const iconStyle = {
    marginRight: "10px",
    cursor: "pointer",
};

export default ProjectInfo;
