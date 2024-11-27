import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../redux/Slice/authSlice";

const LoginForm = ({ heading, role }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const handleToggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            const resultAction = await dispatch(
                loginUser({
                    email: formData.email,
                    password: formData.password,
                    role:role
                })
            );
            if (loginUser.fulfilled.match(resultAction)) {
                const { token, role } = resultAction.payload;
                localStorage.setItem("authToken", token);
                navigate(`/${role}/${role}-dashboard`);
                toast.success("Login successful!");
            } else {
                toast.error("Login failed! Please check your credentials.");
            }
        } catch (error) {
            toast.error("An error occurred during registration.");
        }
    };

    const handleRegister = async () => {
        const registrationData = {
            ...formData,
            role,
        };

        try {
            const resultAction = await dispatch(registerUser(registrationData));
            if (registerUser.fulfilled.match(resultAction)) {
                toast.success("Registration successful! You can now log in.");
                setIsRegistering(false);
            } else {
                toast.error("Registration failed! Please check your details.");
            }
        } catch (error) {
            toast.error("An error occurred during registration."); // Add error handling message
        }
    };

    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                height: "100vh",
                backgroundColor: "#151845",
            }}
        >
            <Box
                className="mt-5"
                sx={{
                    border: "1px solid #3487FF",
                    borderRadius: "16px",
                    width: "500px",
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
                    {isRegistering ? "Register" : heading} Login
                </h2>

                {isRegistering ? (
                    <>
                        <TextField
                            label="Name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleInputChange}
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
                            value={formData.password}
                            onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />

                        <Row className=" text-center mt-2  p-5">
                            <Col>
                                <Button
                                    style={{
                                        backgroundColor: "#4E59FF",
                                        color: "#fff",
                                        borderRadius: "10px",
                                        border: "1px solid #000",
                                        fontSize: "1.2rem",
                                        padding: ".75rem 1rem",
                                        width: "200px",
                                        cursor: "pointer",
                                        margin: "auto",
                                    }}
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                            </Col>
                        </Row>
                        <p
                            style={{
                                color: "#DEDEDE",
                                backgroundColor: "#151845",
                            }}
                        >
                            Already have an account?{" "}
                            <span
                                onClick={() => {
                                    handleToggleForm();
                                }}
                                style={{ cursor: "pointer", color: "blue" }}
                            >
                                Login
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleInputChange}
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
                            value={formData.password}
                            onChange={handleInputChange}
                            sx={{
                                input: { color: "#DEDEDE" },
                                label: { color: "#DEDEDE" },
                            }}
                        />

                        <Row className=" text-center mt-2  p-5">
                            <Col>
                                <Button
                                    style={{
                                        backgroundColor: "#4E59FF",
                                        color: "#fff",
                                        borderRadius: "10px",
                                        border: "1px solid #000",
                                        fontSize: "1.2rem",
                                        padding: ".75rem 1rem",
                                        width: "200px",
                                        cursor: "pointer",
                                        margin: "auto",
                                    }}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Col>
                        </Row>

                        <p
                            style={{
                                color: "#DEDEDE",
                                backgroundColor: "#151845",
                            }}
                        >
                            Are you new?{" "}
                            <span onClick={handleToggleForm} style={{ cursor: "pointer", color: "blue" }}>
                                Register
                            </span>
                        </p>
                    </>
                )}
            </Box>
        </Container>
    );
};

function Login() {
    const { role } = useParams();

    const roleConfig = {
        projectmanager: { heading: "Project Manager" },
        teamleader: { heading: "Team Leader" },
        teammember: { heading: "Team Member" },
    };

    const config = roleConfig[role];

    return <div>{config ? <LoginForm heading={config.heading} role={role} /> : <h2>Invalid Role</h2>}</div>;
}

export default Login;
