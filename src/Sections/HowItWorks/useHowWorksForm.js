import { useEffect, useReducer } from "react";
import api from "../../Utils/loginApi";

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
const useHowWorksForm = (itemId, clearItemId) => {
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value:
        event.target.name === "image"
          ? event.target.files[0]
          : event.target.value,
    });
  };

  const handleSubmit = () => {
    // console.table(formData);
    // return
    var fd = new FormData();
fd.append('text', formData.text);
fd.append('title', formData.title);
fd.append('image', formData.image);
    // // let dataBody = {
    // //   image: fd,
    // //   text: formData.text,
    // //   title: formData.title
    // // }
    // for(var pair of fd.entries()) {
    //   console.log(pair[0]+', '+pair[1]);
    // }
    // return
    api.createHowItWorks(fd).then(response=>{
      console.log(response)
    })
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
      api.getOneHowItWorks(itemId).then(response=>{
        // console.log(response)
        setFormData({ name: "title", value: response.data.data.data.title });
        setFormData({ name: "text", value: response.data.data.data.text });
        setFormData({name:'image', value:response.data.data.data.image})
      })
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

export default useHowWorksForm;
