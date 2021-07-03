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

const BANNERS = {
  BANNERS: `banners`,
};

export const addBannerApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${BANNERS.BANNERS}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getAllBannersApi = async (data) => {
  try {
    let result = await axiosInstance.get(`${BANNERS.BANNERS}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const getOneBannerApi = async (id, data) => {
  try {
    let result = await axiosInstance.get(`${BANNERS.BANNERS}/${id}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const updateBannerApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(`${BANNERS.BANNERS}/${id}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const deleteBannerApi = async (id, data) => {
  try {
    let result = await axiosInstance.delete(`${BANNERS.BANNERS}/${id}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};
