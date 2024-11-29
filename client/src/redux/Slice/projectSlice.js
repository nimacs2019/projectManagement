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

export const fetchProjects = createAsyncThunk("project/fetchProjects", async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get("/api/projects");
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
            });
    },
});
export default projectSlice.reducer;
