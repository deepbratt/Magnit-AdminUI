import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
import { getOneReview, updateReview } from "../../Utils/loginApi";
import { isResponseSuccess } from "../../Utils/helperFunctions";
export default function EditData({ id, edit }) {
  // const { handlePutMethod, responseAlert,open,setOpen,toastType,headers, setToastType, setResponseAlert } = useApi();
  const [responseAlert, setResponseAlert] = useState({status:"", message:""})
  const [open, setOpen] = useState()
  const [toastType, setToastType] = useState()

  const [file, setFile] = useState(null);
  const [cFile, setCFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({
    clientName: "",
    projectName: "",
    projectType: "",
    review: "",
    rating: 0,
  });
  const { clientName, projectName, projectType, review, rating } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    getOneReview(id).then(response=>{
      if(isResponseSuccess(response)){
        setToastType('success')
        setResponseAlert({
          status: response.data.status,
          message: response.statusText
        })
        setData(response.data.data.result);
    setFile(response.data.data.result.image)
    setDate(response.data.data.result.Date)
    setCFile(response.data.data.result.clientImage)
    console.log(response)
      }else{
        setToastType('error')
        setResponseAlert({
          status: response.response.data.status,
          message: response.response.data.message
        })
      }
      setOpen(true)
    })
  };

  const handleUpdate = (id) =>{
    const formData = new FormData();
    formData.append("clientName", clientName);
    formData.append("projectName", projectName);
    formData.append("projectType", projectType);
    formData.append("review", review);
    formData.append("image", file)
    formData.append("clientImage", cFile)
    formData.append("rating", rating);
    console.log("clientName", typeof clientName);
    console.log("projectName", typeof projectName);
    console.log("projectType", typeof projectType);
    console.log("review", typeof review);
    console.log("image", typeof file)
    console.log("clientImage", typeof cFile)
    console.log("rating", typeof rating);
    updateReview(id, formData).then(response=>{
      if(isResponseSuccess(response)){
        setToastType('success')
        setResponseAlert({
          status: response.data.status,
          message: response.statusText
        })
      }else{
        setToastType('error')
        setResponseAlert({
          status: response.response.data.status,
          message: response.response.data.message
        })
      }
      setOpen(true)
    })
  }
 
    
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }; 

  
  return (
    <div>
      <Grid justify="center" container>
        <Grid
          style={{
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "center",
            marginTop: "13px",
          }}
          lg={12}
          item
          xs={12}
        >
          <TextFieldContext
             clientName={clientName}
             projectName={projectName}
             projectType={projectType}
             review={review}
             rating={rating}
             inputChange={inputChange}
             setFile={setFile}
             edit={edit}
             date={date}
             setDate={setDate}
             setCFile={setCFile}
          />
          <Grid item>
            <Button
              type="submit"
              onClick={() => {
                handleUpdate(id);
                setTimeout(() => {
                  edit(false);
                }, 4000);
              }}
              variant="contained"
              color="primary"
            >
              Update Data
            </Button>
            <Button
              type="submit"
              onClick={() => edit(false)}
              variant="contained"
              color="secondary"
              style={{ marginLeft: "15px" }}
            >
              Cancel Edit
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ marginTop: "30px" }}
        >
         {responseAlert && (
          <Toast
            open={open}
            severity={toastType}
            message={responseAlert.message}
            onClose={handleToastClose}
          />
        )}
        </Grid>
      </Grid>
    </div>
  );
}
