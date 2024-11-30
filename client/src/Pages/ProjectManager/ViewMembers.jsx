import React, { useEffect } from "react";
import { fetchMembers } from "../../redux/Slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ViewMembers = () => {
    const dispatch = useDispatch();
    const { members, loading, error } = useSelector((state) => state.auth);
    console.log(members);

    useEffect(() => {
        dispatch(fetchMembers());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: "25px", color: "#fff", minHeight: "100vh" }}>
            <div style={{ overflowX: "auto" }}>
                <h2 style={{ marginBottom: 20 }}>Leaders Information</h2>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#1B1E57",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                textAlign: "left",
                            }}
                        >
                            <th style={tableHeaderStyle}>Sl. No</th>
                            <th style={tableHeaderStyle}>Name</th>
                            <th style={tableHeaderStyle}>Email</th>
                            <th style={tableHeaderStyle}>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((user, index) => (
                            <tr key={user._id} style={{ borderBottom: "1px solid #444", color: "#ddd" }}>
                                <td style={tableCellStyle}>{index + 1}</td>
                                <td style={tableCellStyle}>{user.name}</td>
                                <td style={tableCellStyle}>{user.email}</td>
                                <td style={tableCellStyle}>{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const tableHeaderStyle = {
    padding: "15px 35px",
    fontWeight: "bold",
    textTransform: "uppercase",
};

const tableCellStyle = {
    padding: "15px 5px",
    textAlign: "center",
};

const iconStyle = {
    marginRight: "10px",
    cursor: "pointer",
};

export default ViewMembers;
