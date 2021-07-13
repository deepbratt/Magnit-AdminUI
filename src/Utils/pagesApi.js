import axios from "axios";

const BASE_URL = "https://api.themagnit.com/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Authorization' : "Bearer "+localStorage.getItem('jwt')
  },
});

const PAGES = {
  PAGES: `pages`,
};

export const addPagesApi = async (data) => {
  console.log("Data", data);
  try {
    let result = await axiosInstance.post(`${PAGES.PAGES}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllPagesApi = async () => {
  try {
    let result = await axiosInstance.get(`${PAGES.PAGES}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getOnePagesApi = async (id) => {
  try {
    let result = await axiosInstance.get(`${PAGES.PAGES}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updatePagesApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(`${PAGES.PAGES}/${id}`, data);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const deletePagesApi = async (id) => {
  try {
    let result = await axiosInstance.delete(`${PAGES.PAGES}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
