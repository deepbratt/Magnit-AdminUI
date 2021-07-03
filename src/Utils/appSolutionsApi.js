import axios from "axios";

const BASE_URL = "http://api.themagnit.com/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Authorization' : "Bearer "+localStorage.getItem('jwt')
  },
});

const APPSOLUTIONS = {
  APPSOLUTIONS: `appSolutions`,
};

export const addAppSolutionsApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${APPSOLUTIONS.APPSOLUTIONS}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllAppSolutionsApi = async (data) => {
  try {
    let result = await axiosInstance.get(`${APPSOLUTIONS.APPSOLUTIONS}`, data);
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

export const getOneAppSolutionsApi = async (id) => {
  try {
    let result = await axiosInstance.get(`${APPSOLUTIONS.APPSOLUTIONS}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updateAppSolutionsApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(
      `${APPSOLUTIONS.APPSOLUTIONS}/${id}`,
      data
    );
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const deleteAppSolutionsApi = async (id) => {
  try {
    let result = await axiosInstance.delete(
      `${APPSOLUTIONS.APPSOLUTIONS}/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
