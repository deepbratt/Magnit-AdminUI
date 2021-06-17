import axios from "axios";

const BASE_URL = "http://3.138.190.235/v1/";
const axiosInstance = axios.create({
  baseURL: BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const TRAININGANDCERTIFICATIONS = {
  create: `trainingCertification/create`,
  getAll: `trainingCertification/getAll`,
  getOne: `trainingCertification/getOne`,
  update: `trainingCertification/update`,
  delete: `trainingCertification/delete`,
};

export const addTrainingAndCertificationsApi = async (data) => {
  try {
    let result = await axiosInstance.post(
      `${TRAININGANDCERTIFICATIONS.create}`,
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

export const getAllTrainingAndCertificationsApi = async (data) => {
  try {
    let result = await axiosInstance.get(
      `${TRAININGANDCERTIFICATIONS.getAll}`,
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
      `${TRAININGANDCERTIFICATIONS.getOne}/${id}`
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
    let result = await axiosInstance.put(
      `${TRAININGANDCERTIFICATIONS.update}/${id}`,
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
      `${TRAININGANDCERTIFICATIONS.delete}/${id}`
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
