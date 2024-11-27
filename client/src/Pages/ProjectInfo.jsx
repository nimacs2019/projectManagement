import React from "react";
import { NavLink } from "react-router-dom";


const ProjectInfo = () => {
    return (
        <div style={{ padding: "20px", color: "#fff", minHeight: "100vh" }}>
            {/* Title Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ margin: 0 }}>Project Information</h1>
                <NavLink
                    to="/*/add-projects"
                    style={{
                        textDecoration: "none",
                    }}
                >
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
                </NavLink>
            </div>

            {/* Table Section */}
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
                        <tr style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left" }}>
                            <th style={tableHeaderStyle}>Sl. No</th>
                            <th style={tableHeaderStyle}>Project Name</th>
                            <th style={tableHeaderStyle}>Project ID</th>
                            <th style={tableHeaderStyle}>Assigned To</th>
                            <th style={tableHeaderStyle}>Status</th>
                            <th style={tableHeaderStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example Row 1 */}
                        {mockData.map((project, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #444", color: "#ddd" }}>
                                <td style={tableCellStyle}>{index + 1}</td>
                                <td style={tableCellStyle}>{project.name}</td>
                                <td style={tableCellStyle}>{project.id}</td>
                                <td style={tableCellStyle}>{project.assignedTo}</td>
                                <td style={tableCellStyle}>{project.status}</td>
                                <td style={tableCellStyle}>
                                    <span style={iconStyle}>👁️</span>
                                    <span style={iconStyle}>✏️</span>
                                    <span style={iconStyle}>🗑️</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Mock Data
const mockData = [
    {
        name: "Project Alpha",
        id: "P001",
        assignedTo: "John Doe",
        dueDate: "2024-12-01",
        status: "In Progress",
    },
    {
        name: "Project Beta",
        id: "P002",
        assignedTo: "Jane Smith",
        dueDate: "2024-12-15",
        status: "Completed",
    },
    // Add more rows as needed
];

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
