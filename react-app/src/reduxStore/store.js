import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// import chatReducer from "./chat/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // chat: chatReducer,
  },
});

export default store;
