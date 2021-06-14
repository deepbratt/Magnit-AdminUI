import { useEffect, useReducer } from "react";

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
  getItemApi
) => {
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value:
        event.target.name === "image"
          ? event.target.files[0]
          : event.target.value,
    });
    event.target.value = event.target.name === "image" && null
    if(event.target.name === "image"){
      console.log(typeof event.target.files[0] !== String)
    }
  };

  const handleSubmit = () => {
    var fd = new FormData();
    fd.append("title", formData.title);
    fd.append("text", formData.text);
    fd.append("image", formData.image);
    if (itemId) {
      updateApi(itemId, fd).then((response) => {
        console.log(response);
      });
    }else{
      createApi(fd).then((response) => {
        console.log(response);
      });
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
      getItemApi(itemId).then((response) => {
        setFormData({ name: "title", value: response.data.data.data.title });
        setFormData({ name: "text", value: response.data.data.data.text });
        setFormData({ name: "image", value: response.data.data.data.image });
      });
    }
  }, [itemId]);

  useEffect(() => {
    setFormData({ name: "title", value: "" });
    setFormData({ name: "text", value: "" });
    setFormData({ name: "image", value: "" });
  }, []);
  return {
    handleSubmit,
    handleChange,
    formData,
    clearFields,
  };
};

export default useSimpleForm;
