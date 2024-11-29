import React from 'react'
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const TeamMemberDashboard = () => {
  const { role } = useSelector((state) => state.auth);

    return (
        <div className="container m-1">
            <div style={{ textAlign: "left" }}>
                <h4
                    className="mb-2"
                    style={{
                        padding: "15px",
                        color: "#FFFFFF",
                    }}
                >
                    Team Leader Dashboard
                </h4>
            </div>
            <div className="row g-4">
                <div className="col-md-4">
                    <NavLink
                        to={`/${role}/projects-info`}
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <div
                            className="card text-center shadow"
                            style={{
                                backgroundColor: "#1B1F59",
                                padding: "15px",
                                color: "#FFFFFF",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                borderRadius: "10px",
                            }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">Projects</h5>
                                <h2 className="card-text">10</h2>
                                <a href="#projects" className="btn btn-link">
                                    View More
                                </a>
                            </div>
                        </div>
                    </NavLink>
                </div>

                {/* Team Leaders */}
                <div className="col-md-4">
                    <div
                        className="card text-center shadow"
                        style={{
                            backgroundColor: "#1B1F59",
                            padding: "15px",
                            color: "#FFFFFF",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "10px",
                        }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Team Leaders</h5>
                            <h2 className="card-text">5</h2>
                            <a href="#team-leaders" className="btn btn-link">
                                View More
                            </a>
                        </div>
                    </div>
                </div>

                {/* Team Members */}
                <div className="col-md-4">
                    <div
                        className="card text-center shadow"
                        style={{
                            backgroundColor: "#1B1F59",
                            padding: "15px",
                            color: "#FFFFFF",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "10px",
                        }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Team Members</h5>
                            <h2 className="card-text">25</h2>
                            <a href="#team-members" className="btn btn-link">
                                View More
                            </a>
                        </div>
                    </div>
                </div>

                {/* Pending Tasks */}
                <div className="col-md-6">
                    <div
                        className="card text-center shadow"
                        style={{
                            backgroundColor: "#1B1F59",
                            padding: "15px",
                            color: "#FFFFFF",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "10px",
                        }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Pending Tasks</h5>
                            <h2 className="card-text">12</h2>
                            <a href="#pending-tasks" className="btn btn-link">
                                View More
                            </a>
                        </div>
                    </div>
                </div>

                {/* Completed Tasks */}
                <div className="col-md-6">
                    <div
                        className="card text-center shadow"
                        style={{
                            backgroundColor: "#1B1F59",
                            padding: "15px",
                            color: "#FFFFFF",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "10px",
                        }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Completed Tasks</h5>
                            <h2 className="card-text">40</h2>
                            <a href="#completed-tasks" className="btn btn-link">
                                View More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamMemberDashboard