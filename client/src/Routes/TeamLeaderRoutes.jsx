import React from 'react'
import TeamLeaderDashboard from '../Pages/TeamLeader/TeamLeaderDashboard';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

const TeamLeaderRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    if (role !== "teamleader") {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="teamleader-dashboard" element={<TeamLeaderDashboard />} />
        </Routes>
    );

}

export default TeamLeaderRoutes