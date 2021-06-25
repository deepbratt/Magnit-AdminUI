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

const TRAININGANDCERTIFICATIONS = {
  TRAININGANDCERTIFICATIONS: `/trainingCertification`,
};

export const addTrainingAndCertificationsApi = async (data) => {
  try {
    let result = await axiosInstance.post(
      `${TRAININGANDCERTIFICATIONS.TRAININGANDCERTIFICATIONS}`,
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

export const getAllTrainingAndCertificationApi = async (data) => {
  try {
    let result = await axiosInstance.get(
      `${TRAININGANDCERTIFICATIONS.TRAININGANDCERTIFICATIONS}`,
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

export const getOneTrainingAndCertificationsApi = async (id) => {
  try {
    let result = await axiosInstance.get(
      `${TRAININGANDCERTIFICATIONS.TRAININGANDCERTIFICATIONS}/${id}`
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

export const updateTrainingAndCertificationsApi = async (id, data) => {
  try {
    let result = await axiosInstance.patch(
      `${TRAININGANDCERTIFICATIONS.TRAININGANDCERTIFICATIONS}/${id}`,
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

export const deleteTrainingAndCertificationsApi = async (id) => {
  try {
    let result = await axiosInstance.delete(
      `${TRAININGANDCERTIFICATIONS.TRAININGANDCERTIFICATIONS}/${id}`
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
