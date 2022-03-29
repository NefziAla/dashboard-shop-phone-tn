import { publicRequest, userRequest } from "../requestMethod";
import { deleteCartFailure, deleteCartStart, deleteCartSuccess, getCartFailure, getCartStart, getCartSuccess } from "./cartRedux";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, getUserFailure, getUserStart, getUserSuccess, loginFailure, loginStart, loginSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
    console.log(res.data)
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
export const register=async(dispatch,user)=>{
    
  try{
      const res = await publicRequest.post('/auth/register',user)
      dispatch(loginSuccess(res.data))
  }catch(err){
      console.log(err)
  }
};


export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};


export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const updateUser= async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
    console.log(res.data)
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const getCarts = async (dispatch) => {
  dispatch(getCartStart());
  try {
    const res = await publicRequest.get("/carts");
    dispatch(getCartSuccess(res.data));
  } catch (err) {
    dispatch(getCartFailure());
  }
};

export const deleteCart = async (id, dispatch) => {
  dispatch(deleteCartStart());
  try {
    const res = await userRequest.delete(`/carts/${id}`);
    dispatch(deleteCartSuccess(res.data));
  } catch (err) {
    dispatch(deleteCartFailure());
  }
};