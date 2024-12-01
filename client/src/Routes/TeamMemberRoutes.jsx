import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import TeamMemberDashboard from "../Pages/TeamMember/TeamMemberDashboard";
import ProjectInfo from "../Pages/ProjectInfo";
import MyTasks from "../Pages/TeamMember/MyTasks";
import TeamMemberLayout from "../Components/TeamMemberLayout/TeamMemberLayout";

const TeamMemberRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    if (role !== "teammember") {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<TeamMemberLayout />}>
                <Route path="teammember-dashboard" element={<TeamMemberDashboard />} />
                <Route path="projects-info" element={<ProjectInfo />} />
                <Route path="view-TM-tasks" element={<MyTasks />} />
            </Route>{" "}
        </Routes>
    );
};

export default TeamMemberRoutes;
