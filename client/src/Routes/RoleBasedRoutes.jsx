import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProjectManagerRoutes from "./ProjectManagerRoutes";
import TeamLeaderRoutes from "./TeamLeaderRoutes";
import TeamMemberRoutes from "./TeamMemberRoutes";

const RoleBasedRoutes = () => {
    const { role } = useSelector((state) => state.auth);
    console.log("mmmm", role);

    // Redirect to login if no role is set
    if (!role) {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            {role === "projectmanager" && <Route path="/*" element={<ProjectManagerRoutes />} />}
            {role === "teamleader" && <Route path="/*" element={<TeamLeaderRoutes />} />}
            {role === "teammember" && <Route path="/*" element={<TeamMemberRoutes />} />}


            {/* Fallback for unknown role */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default RoleBasedRoutes;