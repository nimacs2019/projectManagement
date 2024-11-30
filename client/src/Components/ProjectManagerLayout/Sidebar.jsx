import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";

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
                <Nav className="flex-column mt-5 p-2 ">
                    <NavLink
                        to={`/projectmanager/projectmanager-dashboard`}
                        style={({ isActive }) => ({
                            color: isActive ? "#FFFFFF" : "#007bff",
                            textDecoration: "none",
                            marginBottom: "15px",
                        })}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to={`/projectmanager/projects-info`}
                        style={({ isActive }) => ({
                            color: isActive ? "#FFFFFF" : "#007bff",
                            textDecoration: "none",
                            marginBottom: "15px",
                        })}
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to={`/projectmanager/view-leaders`}
                        style={({ isActive }) => ({
                            color: isActive ? "#FFFFFF" : "#007bff",
                            textDecoration: "none",
                            marginBottom: "15px",
                        })}
                    >
                        Team Leaders
                    </NavLink>
                    <NavLink
                        to={`/projectmanager/view-members`}
                        style={({ isActive }) => ({
                            color: isActive ? "#FFFFFF" : "#007bff",
                            textDecoration: "none",
                            marginBottom: "5rem",
                        })}
                    >
                        Team Members
                    </NavLink>{" "}
                    <NavLink
                        to="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                        style={{ textDecoration: "none", marginBottom: "2rem", cursor: "pointer",fontSize:"20px" }}
                    >
                        Logout
                    </NavLink>
                </Nav>
            </Box>
        )
    );
};

export default Sidebar;
