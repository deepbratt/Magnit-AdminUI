import { useEffect, useState } from "react";
import axios from "axios";

const headers = {
  Accept: "multipart/form-data",
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
};

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [errorResponse, setError] = useState({ errorMessage: "" });
  const [success, setSuccess] = useState({ successMessage: "" });
  const [isMounted, setIsMounted] = useState(true);
  const [open, setOpen] = useState(false);
  const [responseAlert, setResponseAlert] = useState({
    status: "",
    message: "",
  });

  useEffect(() => {
    if (isMounted) {
      loadData();
    } else {
      return () => {};
    }
  }, [data]);

  const loadData = async () => {
    try {
      const { data, status } = await axios.get(`${url}`, { headers });
      setSuccess({ successMessage: status });
      setData(data.data.result);
      setIsMounted(true);
    } catch (error) {
      setError({ errorMessage: error.message });
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
          return [...prev, data.data.result];
        });
      }
      setIsPending(false);
      setIsMounted(false);
    } catch (error) {
      console.error("There was an error!", error);
      setIsPending(true);
      setResponseAlert({
        status: error.status,
        message: error.message,
      });
      setOpen(true);
    }
  };

  const updateData = async (Id, items) => {
    try {
      const { status, data } = await axios.patch(`${url}/${Id}`, items, {
        headers,
      });
      if (status === 200) {
        setResponseAlert({
          status: data.status,
          message: "Updated Successfully",
        });
        setOpen(true);
        setData((prev) => {
          return [...prev, data.data.result];
        });
      }
      setIsMounted(false);
    } catch (error) {
      setResponseAlert({
        status: error.status,
        message: error.message,
      });
      setOpen(true);
    }
  };

  const handlePutMethod = async (Id, items) => {
    try {
      const { status, data,result } = await axios.put(`${url}/${Id}`, items, {
        headers,
      });
      if (status === 200) {
        setResponseAlert({
          status: data.status,
          message: "Updated Successfully",
        });
        setOpen(true);
        setData((prev) => {
          return [...prev, data.data.result];
        });
      }
      setIsMounted(false);
    } catch (error ) {
      if(500){
        setResponseAlert({
          status: error.status,
          message: error.message,
        });
        console.log(error)
      }
      setOpen(true);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("There was an error!", error);
      if (error.response) {
        setError({ errorMessage: error.status });
      }
    }
  };

  const handleAddData = async (text, link, buttonLabel) => {
    try {
      const rawResponse = await fetch("http://3.138.190.235/v1/teams", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          link: link,
          buttonLabel: buttonLabel,
        }),
      });
      const { result, status } = await rawResponse.json();

      if (status === "success") {
        setIsPending(false);
        setData((prev) => {
          return [...prev, result.data.data.result];
        });
      }
    } catch (error) {
      if (error) {
        setIsPending(true);
        setResponseAlert({
          status: error.status,
          message: error.message,
        });
        setOpen(true);
      }
    }
  };

  const handleEdit = async (text, link, buttonLabel, id) => {
    try {
      const rawResponse = await fetch(`http://3.138.190.235/v1/teams/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          link: link,
          buttonLabel: buttonLabel,
        }),
      });
      const { data, status } = await rawResponse.json();

      if (status === "success") {
        setIsPending(false);
        setResponseAlert({
          status: data.status,
          message: "Updated Successfully",
        });
        setOpen(true);
      }
    } catch (error) {
      if (error) {
        setIsPending(true);
        setResponseAlert({
          status: error.status,
          message: error.message,
        });
        setOpen(true);
      }
    }
  };

  return {
    data,
    addData,
    isPending,
    updateData,
    success,
    deleteItem,
    handleAddData,
    handleEdit,
    responseAlert,
    open,
    setOpen,
    handlePutMethod
  };
};

export default useApi;
