import axios from "axios";

const BASE_URL = "http://3.138.190.235/v1/";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const USERS = {
  LOGIN: `users/login`,
  FORGOTPASS: `users/forgotPassword`,
  RESETPASS: `users/resetPassword`,
};

export const userLoginApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${USERS.LOGIN}`, data);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const forgotPasswordApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${USERS.FORGOTPASS}`, data);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const resetPasswordApi = async (token, data) => {
  try {
    let result = await axiosInstance.patch(`${USERS.RESETPASS}/${token}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
