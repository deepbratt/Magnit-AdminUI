import { useEffect, useState } from "react";
import { serverResponseMessages } from "../../Utils/formConstants";
import { isResponseSuccess } from "../../Utils/helperFunctions";
import {getAllFAQs, deleteFAQs} from "../../Utils/loginApi";

const useFAQs = () => {
  const [itemId, setItemId] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [toastType, setToastType] = useState('error')
  const {deleteSuccess, deleteFail} = serverResponseMessages

  useEffect(() => {
    setIsLoading(true);
    getAllFAQs()
      .then((response) => {
        if (isResponseSuccess(response)) {
          setDataArray(response.data.data.result);
        }
      })
      .then(() => setIsLoading(false));
  }, []);

  const deleteItem = (id) => {
    setIsLoading(true);
    deleteFAQs(id)
      .then((response) => {
        if (isResponseSuccess(response)) {
          let arr = dataArray;
          let newArr = arr.filter((item) => item._id !== id);
          setDataArray(newArr);
          setResponseMessage(deleteSuccess)
          setToastType('success')
        }else{
          setResponseMessage(deleteFail)
          setToastType('error')
        }
        setOpenToast(true)
      })
      .then(() => setIsLoading(false));
  };
  return {itemId, setItemId, dataArray, setDataArray, isLoading, deleteItem, openToast, setOpenToast, toastType, responseMessage}
};

export default useFAQs;
