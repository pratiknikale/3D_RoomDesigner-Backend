import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
    projectList: [],
    currentProjectDetails: {},
};

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjectList: (state, { payload }) => {
            state.projectList = payload;
        },
        newProject: (state, { payload }) => {
            return { ...state, projectList: [payload, ...state.projectList] };
        },
        deleteProjectRedux: (state, { payload }) => {
            console.log("deleteProjectRedux run ::: ")
            state.projectList = state.projectList.filter((proj, i) => {
                return proj._id !== payload
            })
        },
        setCurrentProjectDetails: (state, { payload }) => {
            state.currentProjectDetails = payload;
        },
        updateFloorDetails: (state, { payload }) => {
            state.currentProjectDetails.elements.Floor[payload.name] = payload.value;
        },
        createWall: (state, { payload }) => {
            // state.currentProjectDetails.elements[payload.name].push(payload.value);
            // return { ...state.currentProjectDetails.elements, Wall: [payload, ...state.currentProjectDetails.elements.Wall] }
            return { ...state, currentProjectDetails: { ...state.currentProjectDetails, elements: { ...state.currentProjectDetails.elements, Wall: [payload.value, ...state.currentProjectDetails.elements.Wall] } } }
        }
    }
});

export const { setProjectList, newProject, deleteProjectRedux, setCurrentProjectDetails, updateFloorDetails, createWall } = projectSlice.actions;

export default projectSlice.reducer;
