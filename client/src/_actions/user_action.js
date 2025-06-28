// user_action.js
import axios from "axios";
import { LOGIN_USER } from "./types";

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

      return response.data; // ✅ 이게 반드시 있어야 함
    } catch (error) {
      return { loginSuccess: false, error: error.message }; // 실패 시 fallback
    }
  };
}
