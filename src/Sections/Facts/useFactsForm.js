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
const useFactsForm = (itemId, clearItemId) => {
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value:
        event.target.name === "image"
          ? URL.createObjectURL(event.target.files[0])
          : event.target.value,
    });
  };

  const handleSubmit = () => {
    console.table(formData);
  };
  
  const clearFields = () =>{
    setFormData({ name: "title", value: "" });
    setFormData({ name: "text", value: "" });
    setFormData({name:"image", value:""})
    clearItemId()
  }

  useEffect(() => {
    if (itemId) {
      // fetch data and populate the fields
      setFormData({ name: "title", value: "hello" });
      setFormData({ name: "text", value: "world" });
      setFormData({name:'image', value:""})
    }
  }, [itemId]);

  useEffect(()=>{
    setFormData({ name: "title", value: "" });
    setFormData({ name: "text", value: "" });
    setFormData({name:"image", value:""})
  },[])
  return {
    handleSubmit,
    handleChange,
    formData,
    clearFields
  };
};

export default useFactsForm;
