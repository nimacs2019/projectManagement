import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

const initialState = {
    project: null,
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
            });
    },
});
export default projectSlice.reducer;
