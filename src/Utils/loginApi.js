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
