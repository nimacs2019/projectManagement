import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Slice/authSlice";
import { toast } from "react-toastify";

const ProjectManagerLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, role } = useSelector((state) => state.auth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [visibleSections, setVisibleSections] = useState({
        students: false,
        staff: false,
        librarian: false,
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSection = (section) => {
        setVisibleSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("authToken");
        navigate("/");
        toast.info("You have logged out successfully.");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh",backgroundColor: "#151845" }}>
            {/* Sidebar */}
            <Sidebar 
                isSidebarOpen={isSidebarOpen}
                visibleSections={visibleSections}
                toggleSection={toggleSection}
                handleLogout={handleLogout}
            />

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                <Box component="main" p={4}>
                    <Outlet />
                </Box>

               
            </div>
        </div>
    );
}

export default ProjectManagerLayout