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

const HIRINGOPTIONS = {
  HIRINGOPTIONS: `hiringOptions`,
};

export const addHiringOptionsApi = async (data) => {
  try {
    let result = await axiosInstance.post(
      `${HIRINGOPTIONS.HIRINGOPTIONS}`,
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

export const getAllHiringOptionsApi = async (data) => {
  try {
    let result = await axiosInstance.get(
      `${HIRINGOPTIONS.HIRINGOPTIONS}`,
      data
    );
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

export const getOneHiringOptionsApi = async (id) => {
  try {
    let result = await axiosInstance.get(
      `${HIRINGOPTIONS.HIRINGOPTIONS}/${id}`
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

export const updateHiringOptionsApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(
      `${HIRINGOPTIONS.HIRINGOPTIONS}/${id}`,
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

export const deleteHiringOptionsApi = async (id) => {
  try {
    let result = await axiosInstance.delete(
      `${HIRINGOPTIONS.HIRINGOPTIONS}/${id}`
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
