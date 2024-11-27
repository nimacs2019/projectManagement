// src/components/Footer.js
import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
    return (
        <footer
            style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                marginTop: "auto",
            }}
        >
            <Typography variant="body2">© 2024 Admin Dashboard</Typography>
        </footer>
    );
};

export default Footer;
