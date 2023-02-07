import Axios from "axios";
import Cookie from 'js-cookie';

import { USER_SIGNIN_REQUEST,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_SUCCESS, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
    USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_RESET,
    USER_UPDATE_RESET, USER_TOPSELLERS_LIST_REQUEST, USER_TOPSELLERS_LIST_SUCCESS, USER_TOPSELLERS_LIST_FAIL } from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post(`http://localhost:5000/api/users/signin`, { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userSignin', JSON.stringify(data));
      Cookie.set('userSignin', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL, payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  }

  const signup = (firstName,lastName, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { firstName,lastName, email, password } });
    try {
      const { data } = await Axios.post(`http://localhost:5000/api/users/register`, { firstName,lastName, email, password });
      Cookie.set('userInfo', JSON.stringify(data));
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload:  error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
  }
  
  
  const detailsUser = (userId) => async (dispatch, getState) => {
  
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };


  const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/users/profile`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
  }
 
const listUsers = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/users', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

  
const signout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    Cookie.remove("userSignin");
    dispatch({ type: USER_LOGOUT });
    document.location.href = '/signin';
  }

  

  
  export { signin ,signup ,detailsUser ,updateUserProfile,listUsers, signout};