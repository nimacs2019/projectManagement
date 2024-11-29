import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#1B1F59",
                color: "#FFFFFF",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleSidebar} aria-label="menu">
                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Project Management System
                </Typography>
                <Button color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
