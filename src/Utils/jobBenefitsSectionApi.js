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

const BENEFITS = {
    BENEFITS: `benifits`,
};

export const addBenefitsApi = async (data) => {
  console.log("Data", data);
  try {
    let result = await axiosInstance.post(`${BENEFITS.BENEFITS}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllBenefitsApi = async () => {
  try {
    let result = await axiosInstance.get(`${BENEFITS.BENEFITS}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getOneBenefitsApi = async (id) => {
  try {
    let result = await axiosInstance.get(`${BENEFITS.BENEFITS}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updateBenefitsApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(`${BENEFITS.BENEFITS}/${id}`, data);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const deleteBenefitsApi = async (id) => {
  try {
    let result = await axiosInstance.delete(`${BENEFITS.BENEFITS}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
