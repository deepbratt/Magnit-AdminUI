import axios from "axios";

const BASE_URL = "http://api.themagnit.com/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

const BENIFITS = {
  BENIFITS: `benifits`,
};

export const addBenifitsApi = async (data) => {
  console.log("Data", data);
  try {
    let result = await axiosInstance.post(`${BENIFITS.BENIFITS}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllBenifitsApi = async () => {
  try {
    let result = await axiosInstance.get(`${BENIFITS.BENIFITS}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getOneBenifitsApi = async (id) => {
  try {
    let result = await axiosInstance.get(`${BENIFITS.BENIFITS}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updateBenifitsApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(`${BENIFITS.BENIFITS}/${id}`, data);

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
    let result = await axiosInstance.delete(`${BENIFITS.BENIFITS}/${id}`);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
