import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import {getAllUsers} from "../../services/api";
// import api from "../../common/api/api";
// import apiKey from "../../common/api/omdbApiKey";

const initialState = {
  user: {},
};

// export const fetchallOrgUsers = createAsyncThunk("user/fetchallOrgUsers", async (loggedUserId) => {
//   const response = await getAllUsers();

//   const RemovedLoggedUser = response.data.filter((user) => {
//     return loggedUserId !== user._id;
//   });

//   return RemovedLoggedUser;
// });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, {payload}) => {
      state.user = payload;
    },
    logoutUser: (state) => {
      state.user = {};
    },
  },
  //   extraReducers: {
  //     [fetchallOrgUsers.fulfilled]: (state, {payload}) => {
  //       return {...state, allOrgUsers: payload, filteredAllOrgUsers: payload};
  //     },
  //   },
});

export const {setLoggedUser, logoutUser} = userSlice.actions;

export default userSlice.reducer;
