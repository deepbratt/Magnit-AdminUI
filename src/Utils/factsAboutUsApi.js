import axios from "axios";

const BASE_URL = "https://api.themagnit.com/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    'Authorization' : "Bearer "+localStorage.getItem('jwt')
  },
});

const FACTSABOUTUS = {
  FACTSABOUTUS: `factsAboutUs`,
};

export const addFactsAboutUsApi = async (data) => {
  console.log("Data", data);
  try {
    let result = await axiosInstance.post(`${FACTSABOUTUS.FACTSABOUTUS}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllFactsAboutUsApi = async () => {
  try {
    let result = await axiosInstance.get(`${FACTSABOUTUS.FACTSABOUTUS}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getOneFactsAboutUsApi = async (id) => {
  try {
    let result = await axiosInstance.get(`${FACTSABOUTUS.FACTSABOUTUS}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updateFactsAboutUsApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(
      `${FACTSABOUTUS.FACTSABOUTUS}/${id}`,
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

export const deleteServiceApi = async (id) => {
  try {
    let result = await axiosInstance.delete(
      `${FACTSABOUTUS.FACTSABOUTUS}/${id}`
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
