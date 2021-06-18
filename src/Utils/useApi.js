import { useEffect, useState } from "react";
import axios from "axios";

const headers = {
  Accept: "multipart/form-data",
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
}

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
      const {data,status} = await axios.get(`${url}`, {headers});
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
      if (error.response) {
        setError({ errorMessage: error.message });
      }
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
          return [...prev, data.data.result];
        });
      }
      setIsMounted(false);
    } catch (error) {
      setError({ errorMessage: error.message });
      console.error("There was an error!", error);
      setIsPending(true);
      if (error.response) {
        
      setError({ errorMessage: error.message });
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
    }
  };

  const handleAddData = async (text,link,buttonLabel) => {
  
    try{
     const rawResponse = await fetch("http://3.138.190.235/v1/teams", {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({   
         text: text,
         link: link,
         buttonLabel: buttonLabel})
     });
     const {content,status} = await rawResponse.json();
   
     if(status === "success"){
       setIsPending(false)
     }
    }
    catch(error){
      if(error){
        setIsPending(true)
      }
    }
};

const handleEdit = async (text,link,buttonLabel,id) => {
  
  try{
   const rawResponse = await fetch(`http://3.138.190.235/v1/teams/${id}`, {
     method: 'PUT',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({   
       text: text,
       link: link,
       buttonLabel: buttonLabel})
   });
   const {content,status} = await rawResponse.json();
 
   if(status === "success"){
     setIsPending(false)
   }
  }
  catch(error){
    if(error){
      setIsPending(true)
    }
  }
};

  return { data, addData, isPending, error, updateData, success, deleteItem,handleAddData,handleEdit };
};

export default useApi;




