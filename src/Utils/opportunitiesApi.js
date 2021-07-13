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

const OPPORTUNITIES = {
  OPPORTUNITIES: `opportunites`,
};

export const addOpportunitiesApi = async (data) => {
  try {
    let result = await axiosInstance.post(
      `${OPPORTUNITIES.OPPORTUNITIES}`,
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

export const getAllOpportunitiesApi = async (data) => {
  try {
    let result = await axiosInstance.get(
      `${OPPORTUNITIES.OPPORTUNITIES}`,
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

export const getOneOpportunitiesApi = async (id) => {
  try {
    let result = await axiosInstance.get(
      `${OPPORTUNITIES.OPPORTUNITIES}/${id}`
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

export const updateOpportunitiesApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(
      `${OPPORTUNITIES.OPPORTUNITIES}/${id}`,
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

export const deleteOpportunitiesApi = async (id) => {
  try {
    let result = await axiosInstance.delete(
      `${OPPORTUNITIES.OPPORTUNITIES}/${id}`
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
