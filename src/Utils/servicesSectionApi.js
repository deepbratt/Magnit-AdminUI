import axios from "axios";

const BASE_URL = "http://api.themagnit.com/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    'Authorization' : "Bearer "+localStorage.getItem('jwt')
  },
});

const SERVICES = {
  SERVICES: `services`,
};

export const addServicesApi = async (data) => {
  console.log("Data", data);
  try {
    let result = await axiosInstance.post(`${SERVICES.SERVICES}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllServicesApi = async () => {
  try {
    let result = await axiosInstance.get(`${SERVICES.SERVICES}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getOneServicesApi = async (id) => {
  try {
    let result = await axiosInstance.get(`${SERVICES.SERVICES}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updateServicesApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(`${SERVICES.SERVICES}/${id}`, data);

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
    let result = await axiosInstance.delete(`${SERVICES.SERVICES}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
