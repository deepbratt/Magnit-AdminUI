import { useEffect, useReducer } from "react";
import { serverResponseMessages } from "../../Utils/formConstants";
import { isResponseSuccess } from "../../Utils/helperFunctions";
import {
  createSeoText,
  getOneSeoText,
  updateSeoText,
} from "../../Utils/loginApi";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialFieldValues = {
  title: "",
  h1Detail: "",
  h2Detail: "",
};

const useSeoText = (
  itemId,
  clearItemId,
  setDataArray,
  dataArray,
  setIsLoading,
  setToastType,
  setOpenToast,
  setResponseMessage
) => {
  const { createFail, updateSuccess, updateFail } = serverResponseMessages;
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = () => {
    let dataBody = {
      title: formData.title,
      h1Detail: formData.h1Detail,
      h2Detail: formData.h2Detail,
    };
    setIsLoading(true);
    if (itemId) {
      updateSeoText(itemId, dataBody).then((response) => {
        if (isResponseSuccess(response)) {
          console.log(response)
          let temp = dataArray;
          temp = temp.filter(item=>item._id!==itemId)
          setDataArray(oldArray => [...temp, response.data.data.result])
          setResponseMessage("success");
          setToastType("success");
          // clearFields()
        } else {
          setResponseMessage("error");
          setToastType("error");
        }
        setOpenToast(true);
        setIsLoading(false);
      });
    } else {
      createSeoText(dataBody).then((response) => {
        if (isResponseSuccess(response)) {
          console.log(response);
          // setDataArray(oldArray => [...oldArray, response.data.data.result])
          setResponseMessage("success");
          setToastType("success");
          // clearFields()
        } else {
          setResponseMessage("error");
          setToastType("error");
        }
        setOpenToast(true);
        setIsLoading(false);
      });
    }
  };

  const clearFields = () => {
    setFormData({ name: "title", value: "" });
    setFormData({ name: "h1Detail", value: "" });
    setFormData({ name: "h2Detail", value: "" });
    clearItemId();
  };

  useEffect(() => {
    clearFields();
  }, [dataArray]);

  useEffect(() => {
    if (itemId) {
      setIsLoading(true);
      getOneSeoText(itemId).then((response) => {
        if (isResponseSuccess) {
          console.log(response);
          setFormData({ name: "title", value: response.data.data.result.title });
          setFormData({ name: "h1Detail", value: response.data.data.result.h1Detail });
          setFormData({ name: "h2Detail", value: response.data.data.result.h2Detail });
        } else {
          setToastType("error");
          setOpenToast(true);
          setResponseMessage(response);
        }
        setIsLoading(false);
      });
    }
  }, [itemId]);

  return { formData, handleChange, clearItemId, handleSubmit, clearFields };
};

export default useSeoText;
