import React from "react";
import TeamLeaderDashboard from "../Pages/TeamLeader/TeamLeaderDashboard";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import TeamLeaderLayout from "../Components/TeamLeaderLayout/TeamLeaderLayout";
import ProjectInfo from "../Pages/ProjectInfo";
import MyTasks from "../Pages/TeamLeader/MyTasks";

const TeamLeaderRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    if (role !== "teamleader") {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<TeamLeaderLayout />}>
                <Route path="teamleader-dashboard" element={<TeamLeaderDashboard />} />
                <Route path="projects-info" element={<ProjectInfo />} />
                <Route path="view-TL-tasks" element={<MyTasks />} />


            </Route>{" "}
        </Routes>
    );
};

export default TeamLeaderRoutes;
