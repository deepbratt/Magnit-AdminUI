import axios from "axios";

const BASE_URL = "http://3.138.190.235/v1/";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

const SERVICES = {
  SERVICES: `services`,
};

export const addServicesApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${SERVICES.SERVICES}`, data);
    console.log("Data", data);
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
