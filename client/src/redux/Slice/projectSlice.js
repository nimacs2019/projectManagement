import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

const initialState = {
    project: [],
    loading: false,
    error: null,
};
// add project
export const addProject = createAsyncThunk("project/addProject", async (projectData, { rejectWithValue }) => {
    try {
        const response = await instance.post("/api/add-project", projectData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// fetch all projects
export const fetchProjects = createAsyncThunk("project/fetchProjects", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get("/api/projects");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// fetch teamleaders and team members task assigned projects only
export const assignedProjects = createAsyncThunk("project/assignedProjects", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get("/api/projects/own-projects");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const editProject = createAsyncThunk("project/editProject", async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const response = await instance.put(`/api/projects/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const deleteProject = createAsyncThunk("project/deleteProject", async (id, { rejectWithValue }) => {
    try {
        const response = await instance.delete(`/api/projects/${id}`);
        return { id, message: response.data.message };
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const updateProjectStatus = createAsyncThunk(
    "project/updateProjectStatus",
    async ({ projectId, status }, { rejectWithValue }) => {
        console.log("Attempting to update project status:", { projectId, status });

        // Validate input parameters
        if (!projectId || !status) {
            console.error("Invalid input: Missing projectId or status");
            return rejectWithValue({ message: "Invalid input: Missing projectId or status" });
        }

        try {
            const { data } = await instance.put(`/api/projects/${projectId}/status`, {
                status, // Only send status in the body
            });

            console.log("Project status updated successfully:", data);
            return data; 
        } catch (error) {
            console.error("Error updating project status:", error);
            return rejectWithValue(
                error.response?.data || { message: "An error occurred while updating project status" }
            );
        }
    }
);



const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
            })
            .addCase(addProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(assignedProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignedProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
            })
            .addCase(assignedProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.project.findIndex((proj) => proj._id === action.payload._id);
                if (index !== -1) {
                    state.project[index] = action.payload;
                }
            })
            .addCase(editProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = state.project.filter((proj) => proj._id !== action.payload.id);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProjectStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProjectStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProject = action.payload;
                state.project = state.project.map((project) =>
                    project._id === updatedProject._id ? { ...project, status: updatedProject.status } : project
                );
            })
            .addCase(updateProjectStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default projectSlice.reducer;
