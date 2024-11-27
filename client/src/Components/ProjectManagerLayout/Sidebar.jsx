import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, visibleSections, toggleSection, handleLogout }) => {
    const { role } = useParams();
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
                <h4>Pro<span style={{color:"#3282F6"}}>Task</span></h4>
                <Nav className="flex-column mt-5 p-2" >
                    <Nav.Link href="#">Dashboard</Nav.Link>
                    <Nav.Link href="#">Projects</Nav.Link>
                    <Nav.Link href="#">Team Leaders</Nav.Link>
                    <Nav.Link href="#">Team Members</Nav.Link>

                    {/* <Nav.Link onClick={() => toggleSection("students")}>
                        Students {visibleSections.students ? "▲" : "▼"}
                    </Nav.Link>
                    {visibleSections.students && (
                        <Nav className="flex-column" style={{ paddingLeft: "20px" }}>
                            <Nav.Link as={Link} to={`/${role}/students-lists`}>
                                View Student Details
                            </Nav.Link>
                            <Nav.Link as={Link} to={`/${role}/add-student`}>
                                Add Student
                            </Nav.Link>
                            <Nav.Link as={Link} to={`/${role}/fee-management`}>
                                Fees Management
                            </Nav.Link>
                            <Nav.Link href="#">Library Records</Nav.Link>
                        </Nav>
                    )} */}

                    

                    
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Box>
        )
    );
};

export default Sidebar;
