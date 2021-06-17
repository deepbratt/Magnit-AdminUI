import { useEffect, useState } from "react";
import { serverResponseMessages } from "../../Utils/formConstants";
import { isResponseSuccess } from "../../Utils/helperFunctions";
import {getAllCaseStudies, deleteCaseStudies} from "../../Utils/loginApi";

const useCaseStudies = () => {
  const [itemId, setItemId] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [toastType, setToastType] = useState('error')
  const {deleteSuccess, deleteFail} = serverResponseMessages

  useEffect(() => {
    setIsLoading(true);
    getAllCaseStudies()
      .then((response) => {
        if (isResponseSuccess(response)) {
          setDataArray(response.data.data.CaseStudies);
        }
      })
      .then(() => setIsLoading(false));
  }, []);

  const deleteItem = (id) => {
    setIsLoading(true);
    deleteCaseStudies(id)
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

export default useCaseStudies;
