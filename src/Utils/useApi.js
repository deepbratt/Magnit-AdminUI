import { useEffect, useState } from "react";
import axios from "axios";

const headers = {
  "content-type": "multipart/form-data",
};

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState({ errorMessage: "" });
  const [success, setSuccess] = useState({ successMessage: "" });
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      loadData();
    } else {
      return () => {};
    }
  }, [data]);

  const loadData = async () => {
    try {
      const { data } = await axios.get(`${url}`);
      setSuccess({ successMessage: data.success });
      setData(data.data.data);
      setIsMounted(true);
    } catch (error) {
      setError({ errorMessage: error.message });
      console.error("There was an error!", error);
      console.log(error);
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      console.log(error.config);
    }
  };

  const addData = async (formData) => {
    try {
      const { status, data } = await axios.post(`${url}`, formData, {
        headers,
      });
      if (status === 200) {
        setSuccess({ successMessage: data.success });
        setData((prev) => {
          return [...prev, data.data.data];
        });
      }
      setIsPending(false);
      setIsMounted(false);
    } catch (error) {
      setError({ errorMessage: error.message });
      console.error("There was an error!", error);
      setIsPending(true);
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      console.log(error.config);
    }
  };

  const updateData = async (Id, items) => {
    try {
      const { status, data } = await axios.patch(`${url}/${Id}`, items, {
        headers,
      });
      if (status === 200) {
        setSuccess({ successMessage: data.success });
        setError(false);
        setIsPending(false);
        setData((prev) => {
          return [...prev, data.data.data];
        });
      }
      setIsMounted(false);
    } catch (error) {
      setError({ errorMessage: error.message });
      console.error("There was an error!", error);
      setIsPending(true);
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      console.log(error.config);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("There was an error!", error);
      if (error.response) {
        setError({ errorMessage: error.message });
      }
      console.log(error.config);
    }
  };

  return { data, addData, isPending, error, updateData, success, deleteItem };
};

export default useApi;
