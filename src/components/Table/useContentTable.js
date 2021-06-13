import { useState } from "react";
import axios from "axios";

const useContentTable = (url) => {
  const [error, setError] = useState({ errorMessage: "" });

  const editItem = (id) => {
    console.log("Edit this Item= " + id);
  };

  const deleteItem = async (Id) => {
    try {
      await axios.delete(`${url}/${Id}`);
      window.location.reload();
    } catch (error) {
      setError({ errorMessage: error.message });
      console.error("There was an error!", error);
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      console.log(error.config);
    }
  };

  return { editItem, deleteItem, error };
};

export default useContentTable;
