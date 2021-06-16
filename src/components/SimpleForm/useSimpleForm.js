import { useEffect, useReducer, useState } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialFieldValues = {
  title: "",
  text: "",
  image: "",
};
const useSimpleForm = (
  itemId,
  clearItemId,
  createApi,
  updateApi,
  getItemApi,
  updateDataArray,
  dataArray
) => {
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value:
        event.target.name === "image"
          ? event.target.files[0]
          : event.target.value,
    });
    event.target.value = event.target.name === "image" && null
  };

  const handleSubmit = () => {
    var fd = new FormData();
    fd.append("title", formData.title);
    fd.append("text", formData.text);
    fd.append("image", formData.image);
    let temp = dataArray
    setIsLoading(true)
    if (itemId) {
      updateApi(itemId, fd).then((response) => {
        if(response.success){
          temp = temp.filter(item=>item._id!==itemId)
          updateDataArray(oldArray => [...temp, response.server.data.data.data])
          // clearFields()
        }
      }).then(()=>setIsLoading(false));
    }else{
      createApi(fd).then((response) => {
        if(response.success){
          updateDataArray(oldArray => [...oldArray, response.server.data.data.data])
          // clearFields()
        }
      }).then(()=>setIsLoading(false));
    }
  };

  const clearFields = () => {
    setFormData({ name: "title", value: "" });
    setFormData({ name: "text", value: "" });
    setFormData({ name: "image", value: "" });
    clearItemId();
  };

  useEffect(() => {
    if (itemId) {
      // fetch data and populate the fields
      setIsLoading(true)
      getItemApi(itemId).then((response) => {
        if(response.success){
          setFormData({ name: "title", value: response.server.data.data.data.title });
          setFormData({ name: "text", value: response.server.data.data.data.text });
          setFormData({ name: "image", value: response.server.data.data.data.image });
        }
      }).then(()=>setIsLoading(false));
    }
  }, [itemId]);

  useEffect(() => {
    clearFields()
  }, [dataArray]);
  return {
    handleSubmit,
    handleChange,
    formData,
    clearFields,
    isLoading
  };
};

export default useSimpleForm;
