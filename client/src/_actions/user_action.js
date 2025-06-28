// user_action.js
import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        dataToSubmit
      );

      dispatch({
        type: LOGIN_USER,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      return { loginSuccess: false, error: error.message };
    }
  };
}

export function registerUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        dataToSubmit
      );

      dispatch({
        type: REGISTER_USER,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      return { register: false, error: error.message };
    }
  };
}

export function auth() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/auth`,
        { withCredentials: true } // 쿠키 인증 시 필요
      );

      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      return { isAuth: false, error: error.message };
    }
  };
}
