import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectManagerDashboard from "../Pages/ProjectManager/ProjectManagerDashboard";
import ProjectManagerLayout from "../Components/ProjectManagerLayout/ProjectManagerLayout";
import ProjectInfo from "../Pages/ProjectInfo";
import AddProject from "../Pages/ProjectManager/AddProject";

const ProjectManagerRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    if (role !== "projectmanager") {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="" element={<ProjectManagerLayout />}>
                <Route path="projectmanager-dashboard" element={<ProjectManagerDashboard />} />
                <Route path="projects-info" element={<ProjectInfo />} />
                <Route path="add-projects" element={<AddProject />} />
            </Route>
        </Routes>
    );
};

export default ProjectManagerRoutes;
