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

const BENEFITS = {
    BENEFITS: `jobBenifits`,
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
