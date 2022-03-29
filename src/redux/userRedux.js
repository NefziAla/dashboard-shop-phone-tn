import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        users:[],
        currentUser:null,
        isFetching:false,
        error:false
    },
    reducers:{
       loginStart:(state)=>{
         state.isFetching=true
       },
       loginSuccess:(state,action)=>{
        state.isFetching=false
        state.currentUser=action.payload


       },
       loginFailure:(state,action)=>{
        state.isFetching=false
        state.error=true

       },
       logout: (state) => {
        state.currentUser = null;
      },
      register:(state,action)=>{
        state.currentUser=action.payload
       },
       //DELETE
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET ALL
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    }
})

export const {loginStart,loginSuccess,loginFailure,logout,register, deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure, getUserStart,
  getUserSuccess,
  getUserFailure, updateUserStart,
  updateUserSuccess,
  updateUserFailure,}=userSlice.actions
export default userSlice.reducer