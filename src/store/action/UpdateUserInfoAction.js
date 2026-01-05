import axios from "axios";
import Cookies from "universal-cookie";
import {
  UPDATE_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
} from "../types/UpdateUserInfoConstants";

const cookies = new Cookies();

export const updateUserInfoAction =
  ({userId, firstName,lastName, email, contactNumber, department, designation, speciality }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_FAIL,
      });
      const token = cookies.get("ddAdminToken");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/users/update`,
        { userId,firstName,lastName, email, contactNumber, department, designation, speciality },
        config
      );
      dispatch({
        type: UPDATE_REQUEST,
        payload: data,
      });
    } catch (error) {
      // console.log("get log count api error", error);
      dispatch({
        type: UPDATE_SUCCESS,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };
