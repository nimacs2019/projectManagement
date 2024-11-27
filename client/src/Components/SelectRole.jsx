import React, { useState } from "react";
import { Button, Col, Container, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleLogin = () => {
        if (selectedRole) {
            navigate(`/login/${selectedRole.toLowerCase()}`);
        } else {
            alert("Please select a role before logging in.");
        }
    };

    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-top align-items-center"
            style={{
                height: "100vh",
                backgroundColor: "#151845",
            }}
        >
            <Box
                style={{
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <Row className="w-100 text-center mb-4  p-5">
                    <Col>
                        <h2
                            style={{
                                color: "#fff",
                                fontSize: "2.5rem",
                            }}
                        >
                            Select Role
                        </h2>
                    </Col>
                </Row>{" "}
                <Row className="w-100 justify-content-center mb-4">
                    <Col xs="auto"  className="mb-3">
                        <div
                            style={{
                                backgroundColor: selectedRole === "projectManager" ? "#3F47CC" : "#143563",
                                color: "#fff",
                                borderRadius: "10px",
                                border: "1px solid #000",
                                fontSize: "1.5rem",
                                padding: "1rem 2rem",
                                maxWidth: "200px",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => handleRoleSelect("projectManager")}
                        >
                            PROJECT MANAGER
                        </div>
                    </Col>
                    <Col xs="auto"  className="mb-2">
                        <div
                            style={{
                                backgroundColor: selectedRole === "teamleader" ? "#3F47CC" : "#143563", 
                                color: "#fff", 
                                borderRadius: "10px",
                                border: "1px solid #000",
                                fontSize: "1.5rem",
                                padding: "1rem 2rem",
                                maxWidth: "200px",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => handleRoleSelect("teamleader")}
                        >
                            TEAM LEADERS
                        </div>
                    </Col>
                    <Col xs="auto"  className="mb-2">
                        <div
                            style={{
                                backgroundColor: selectedRole === "teammember" ? "#3F47CC" : "#143563",
                                color: "#fff",
                                borderRadius: "10px",
                                border: "1px solid #000",
                                fontSize: "1.5rem",
                                padding: "1rem 2rem",
                                maxWidth: "200px",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => handleRoleSelect("teammember")}
                        >
                            TEAM MEMBERS
                        </div>
                    </Col>
                </Row>
                <Row className=" text-center mt-4  p-5">
                    <Col>
                        <Button style={{
                                backgroundColor: "#4E59FF",
                                color: "#fff",
                                borderRadius: "10px",
                                border: "1px solid #000",
                                fontSize: "1.5rem",
                                padding: "1rem 1rem",
                                width: "250px",
                                cursor: "pointer",
                                margin:"auto"
                            }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Col>
                </Row>
            </Box>
        </Container>
    );
};

export default SelectRole;
