import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import TeamMemberDashboard from '../Pages/TeamMember/TeamMemberDashboard';


const TeamMemberRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    if (role !== "teammember") {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="teammember-dashboard" element={<TeamMemberDashboard />} />
        </Routes>
    );
}

export default TeamMemberRoutes