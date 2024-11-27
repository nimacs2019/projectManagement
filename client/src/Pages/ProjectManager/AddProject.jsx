import { Box, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const AddProject = () => {
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
                            name="projecId"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            // value={formData.name}
                            // onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                        <TextField
                            label="Project Name"
                            name="projecname"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            // value={formData.name}
                            // onChange={handleInputChange}
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
                            // value={formData.name}
                            // onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />

                        <TextField
                            label="Password"
                            name="password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            // value={formData.password}
                            // onChange={handleInputChange}
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
                            // value={formData.email}
                            // onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
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
                            >
                                Team Members
                            </Button>
                        </Col>
                    </Col>
                </Row>
                <Row className=" text-center mt-2  p-5">
                    <Col>
                        <Button
                            style={{
                                backgroundColor: "#272D80",
                                color: "#fff",
                                borderRadius: "10px",
                                border: "1px solid #000",
                                fontSize: "1.2rem",
                                padding: ".75rem 1rem",
                                width: "200px",
                                cursor: "pointer",
                                margin: "auto",
                            }}
                            // onClick={handleRegister}
                        >
                            ADD
                        </Button>
                    </Col>
                </Row>
            </Box>
        </Container>
    );
};

export default AddProject;
