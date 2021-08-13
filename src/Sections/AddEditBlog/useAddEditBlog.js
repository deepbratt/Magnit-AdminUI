import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isResponseSuccess } from "../../Utils/helperFunctions";
import { createBlog, getOneBlog, updateBlog } from "../../Utils/loginApi";

const initialFieldValues = {
  title: "",
  canonical: "",
  description: "",
  keywords: "",
  banner: "",
  date: "",
  descriptionLong: "",
  type: "draft",
};

const formReducer = (state = initialFieldValues, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const useAddEditBlog = () => {
  let { contentId } = useParams();
  // const params = useParams()
  const formRef = useRef(null)
  const [caretPosition, setCaretPosition] = useState({caretStart:0, caretEnd:0, event:undefined})
  const [rawData, setRawData] = useState("");
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const [responseMessage, setResponseMessage] = useState("");
  const [toastType, setToastType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [blogData, setBlogData] = useState('')
  const [, setDefaultdate] = useState('12-12-2000')
  const history = useHistory();

  const handleChange = (event) => {
    const caretStart = event.target.selectionStart;
  const caretEnd = event.target.selectionEnd;
    setFormData({
      name: event.target.name,
      value:
        event.target.name === "banner"
          ? event.target.files[0]
          : event.target.value,
    });
    event.target.value = event.target.name === "banner" && null;
    // event.target.setSelectionRange(caretStart, caretEnd);
    if(event.target.name !== "banner" || event.target.name !== "type"){
      setCaretPosition({caretStart:caretStart, caretEnd:caretEnd, event: event});
    }
  };

  async function saveBlogData() {
    var blobHtml = new Blob([rawData], { type: "text/plain;charset=utf-8" });
    let fd = new FormData();
    fd.append("title", formData.title);
    fd.append("canonical", formData.canonical);
    fd.append("description", formData.description);
    fd.append("descriptionLong", formData.descriptionLong);
    fd.append("keywords", formData.keywords);
    fd.append("type", formData.type);
    fd.append("date", formData.date);
    fd.append("banner", formData.banner); // image blob
    fd.append("html", blobHtml); // text file blob

    let htmlText = await blobHtml.text();

    let data = {
      title: formData.title,
      descriptionLong: formData.descriptionLong,
      description: formData.description,
      canonical: formData.canonical,
      keywords: formData.keywords,
      type: formData.type,
      date: formData.date,
      banner: formData.banner,
      html: htmlText,
    };
    console.table("data ", data)
    // return
    setIsLoading(true);
    if (contentId) {
      // update already added blog data
      updateBlog(contentId, fd).then(response=>{
        if(isResponseSuccess(response)){
            setToastType('success')
            setResponseMessage(response.data.message)
            // clearState()
            cancelAddEdit()
        }else{
          setToastType('error')
          setResponseMessage(response.data.message) 
        }
        setOpenToast(true)
      }).then(()=>setIsLoading(false))
    } else {
      // create new blog data
      createBlog(fd).then(response=>{
          if(isResponseSuccess(response)){
              setToastType('success')
              setResponseMessage(response.data.message)
              clearState()
            //   cancelAddEdit()
          }else{
            setToastType('error')
            setResponseMessage("error") 
          }
          setOpenToast(true)
      }).then(()=>setIsLoading(false))
    }
  }

  useEffect(() => {
    if (contentId) {
      // fetch already added blog data
      setIsLoading(true);
      getOneBlog(contentId)
        .then((response) => {
          if (isResponseSuccess(response)) {
            let result = response.data.data.result
            let responseDate = new Date(result.date)
            // let formatedDate = responseDate.getMonth()+"/"+responseDate.getDate()+"/"+responseDate.getFullYear()
            setDefaultdate(responseDate)
            setFormData({ name: "title", value: result.title });
            setFormData({ name: "description", value: result.description });
            setFormData({ name: "descriptionLong", value: result.descriptionLong });
            setFormData({ name: "date", value: responseDate });
            setFormData({ name: "banner", value: result.banner });
            setFormData({ name: "type", value: result.type });
            setFormData({ name: "keywords", value: result.keywords });
            setFormData({ name: "canonical", value: result.canonical });
            fetchHtml(result.html)
          }
        })
        .then(() => setIsLoading(false));
    }
  }, [contentId]);

  useEffect(()=>{
    if(caretPosition.event !== undefined && caretPosition.event.target.name !== "type" && caretPosition.event.target.name !== "banner"){
      caretPosition.event.target.setSelectionRange(caretPosition.caretStart, caretPosition.caretEnd)
    }
  },[caretPosition])

  const fetchHtml = async (url) =>{
      let htmlText = await axios.get(url)
      setRawData(htmlText.data)
      setBlogData(htmlText.data)
  }

  const clearState = () => {
    setFormData({ name: "title", value: "" });
    setFormData({ name: "description", value: "" });
    setFormData({ name: "descriptionLong", value: "" });
    setFormData({ name: "date", value: "" });
    setFormData({ name: "banner", value: "" });
    setFormData({ name: "type", value: "draft" });
    setFormData({ name: "keywords", value: "" });
    setFormData({ name: "canonical", value: "" });
    setRawData('')
    contentId = ''
  };

  const cancelAddEdit = () => {
    history.push("/blogs");
  };

  return {
    saveBlogData,
    handleChange,
    openToast,
    isLoading,
    toastType,
    setOpenToast,
    responseMessage,
    formData,
    rawData,
    setRawData,
    cancelAddEdit,
    blogData,
    setFormData,
    formRef
  };
};

export default useAddEditBlog;
