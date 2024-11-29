import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { Nav, NavLink } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isSidebarOpen, visibleSections, toggleSection, handleLogout }) => {
    const { role } = useSelector((state) => state.auth);
    return (
        isSidebarOpen && (
            <Box
                sx={{
                    width: "250px",
                    backgroundColor: "#1B1F59",
                    padding: "15px",
                    color: "#FFFFFF",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h4>
                    Pro<span style={{ color: "#3282F6" }}>Task</span>
                </h4>
                <Nav className="flex-column mt-5 p-2">
                    <NavLink to={`/projectmanager-dashboard`}>Dashboard</NavLink>
                    <NavLink to={`/projects-info`}>Projects</NavLink>
                    <NavLink to={`/add-projects`}>Add Project</NavLink>
                    <NavLink to={`/edit-project/:projectId`}>Edit Project</NavLink>{" "}
                    <NavLink as="button" onClick={handleLogout} className="logout-link">
                        Logout
                    </NavLink>
                </Nav>
            </Box>
        )
    );
};

export default Sidebar;
