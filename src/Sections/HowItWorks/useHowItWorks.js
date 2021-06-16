import { useEffect, useState } from "react";
import api from "../../Utils/loginApi";

const useHowItWorks = () => {
  const [itemId, setItemId] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .getAllHowItWorks()
      .then((response) => {
        if (response.success) {
          setDataArray(response.server.data.data.data);
        }
      })
      .then(() => setIsLoading(false));
  }, []);

  const deleteItem = (id) => {
    setIsLoading(true);
    api
      .deleteHowItWorks(id)
      .then((response) => {
        if (response.success) {
          let arr = dataArray;
          let newArr = arr.filter((item) => item._id !== id);
          setDataArray(newArr);
        }
      })
      .then(() => setIsLoading(false));
  };
  return {itemId, setItemId, dataArray, setDataArray, isLoading, deleteItem}
};

export default useHowItWorks;
