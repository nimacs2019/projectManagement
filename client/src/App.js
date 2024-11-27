import { BrowserRouter, Route,  Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RoleBasedRoutes from "./Routes/RoleBasedRoutes";
import Login from "./Components/LoginForm";
import SelectRole from "./Components/SelectRole";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SelectRole />} />
                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/:role/*" element={<RoleBasedRoutes />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
