import axios from "axios";

const BASE_URL = "http://api.themagnit.com/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const OURWORK = {
  OURWORK: `ourwork`,
};

export const addOurWorkApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${OURWORK.OURWORK}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllOurWorkApi = async (data) => {
  try {
    let result = await axiosInstance.get(`${OURWORK.OURWORK}`, data);
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getOneOurWorkApi = async (id) => {
  try {
    let result = await axiosInstance.get(`${OURWORK.OURWORK}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updateOurWorkApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(`${OURWORK.OURWORK}/${id}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const deleteOurWorkApi = async (id) => {
  try {
    let result = await axiosInstance.delete(`${OURWORK.OURWORK}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
