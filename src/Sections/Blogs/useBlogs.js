import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isResponseSuccess } from "../../Utils/helperFunctions";
import { deleteBlog, getAllBlogs } from "../../Utils/loginApi";

const useBlogs = () => {
  const [serverResponse, setServerResponse] = useState();
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastType, setToastType] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openToast, setOpenToast] = useState(false)
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getAllBlogs()
      .then((response) => {
        if (response) {
          setServerResponse(response);
          console.log(response);
          setDataArray(response.data.data.result);
        }
      })
      .then(() => setIsLoading(false));
  }, []);

  const createBlog = () => {
    history.push("/blogs/add-edit-blog");
  };
  const updateBlog = (id) => {
    history.push("/blogs/add-edit-blog/"+id);
  };

  const removeBlog = (id) => {
      setIsLoading(true)
    deleteBlog(id).then((response) => {
      if (isResponseSuccess(response)) {
        setResponseMessage(response.data.message);
        setToastType("success");
        let temp = dataArray
        temp = temp.filter(item=>item._id!==id)
        setDataArray(temp)
      }else{
        setResponseMessage(response.data.message);
        setToastType("error"); 
      }
      setOpenToast(true)
    }).then(()=>setIsLoading(false));
  };
  return { isLoading, dataArray, createBlog, toastType, responseMessage, removeBlog, updateBlog, openToast, setOpenToast };
};

export default useBlogs;
