import { useEffect, useReducer, useState } from "react";
import { serverResponseMessages } from "../../Utils/formConstants";
import { isResponseSuccess } from "../../Utils/helperFunctions";

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
const useOnlyTextForm = (
  itemId,
  clearItemId,
  createApi,
  updateApi,
  getItemApi,
  updateDataArray,
  dataArray,
  apiFieldNames
) => {
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const [isLoading, setIsLoading] = useState(false)
  const [openToast, setOpenToast] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [toastType, setToastType] = useState('error')
  const {createFail, updateSuccess, updateFail} = serverResponseMessages
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = () => {
    var fd = new FormData();
    fd.append(apiFieldNames.title, formData[apiFieldNames.title]);
    fd.append(apiFieldNames.text, formData[apiFieldNames.text]);
    let temp = dataArray
    setIsLoading(true)
    if (itemId) {
      updateApi(itemId, fd).then((response) => {
        if(isResponseSuccess(response)){
          temp = temp.filter(item=>item._id!==itemId)
          updateDataArray(oldArray => [...temp, response.data.data.result])
          setResponseMessage(updateSuccess)
          setToastType('success')
        }else{
          setResponseMessage(updateFail)
          setToastType('error')
        }
        setOpenToast(true)
      }).then(()=>setIsLoading(false));
    }else{
      createApi(fd).then((response) => {
        if(isResponseSuccess(response)){
          updateDataArray(oldArray => [...oldArray, response.data.data.result])
          setResponseMessage(response.data.message)
          setToastType('success')
        }else{
          setResponseMessage(createFail)
          setToastType('error')
        }
        setOpenToast(true)
      }).then(()=>setIsLoading(false));
    }
  };

  const clearFields = () => {
    setFormData({ name: apiFieldNames.title, value: "" });
    setFormData({ name: apiFieldNames.text, value: "" });
    clearItemId();
  };

  useEffect(() => {
    if (itemId) {
      // fetch data and populate the fields
      setIsLoading(true)
      getItemApi(itemId).then((response) => {
        if(isResponseSuccess(response)){
          setFormData({ name: apiFieldNames.title, value: response.data.data.result[apiFieldNames.title] });
          setFormData({ name: apiFieldNames.text, value: response.data.data.result[apiFieldNames.text] });
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
    isLoading, openToast, setOpenToast, toastType, responseMessage
  };
};

export default useOnlyTextForm;
