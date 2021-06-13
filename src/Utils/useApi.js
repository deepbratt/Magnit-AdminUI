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

  useEffect(() => {
    loadData();
  }, [data]);

  const loadData = async () => {
    try {
      const result = await axios.get("http://3.138.190.235/v1/sliders");
      setSuccess({ successMessage: result.data.success });
      setData(result.data.data.data);
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
      const result = await axios.post(`${url}`, formData, { headers });
      if (result.status === 200) {
        setSuccess({ successMessage: result.data.success });
        setData((prev)=>{
          return [...prev,result.data.data.data]
        })
      }
      setIsPending(false);
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
      const result = await axios.patch(`${url}/${Id}`, items, { headers });
      if (result.status === 200) {
        setSuccess({ successMessage: result.data.success });
        setError(false);
        setIsPending(false);
        setData((prev)=>{
          return [...prev,result.data.data.data]
        })
      }
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

  return { data, addData, isPending, error, updateData, success };
};

export default useApi;
