import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import projectsReducer from "./projects/projectSlice";
// import chatReducer from "./chat/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
  },
});

export default store;
