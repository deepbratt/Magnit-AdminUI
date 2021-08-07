import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import AddData from "./AddData"
import EditData from "./EditData"
import Table from "../../components/Table.js/index"
import useApi from "../../Utils/useApi"
import Loader from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import { deleteReview, getAllReviews } from "../../Utils/loginApi";
import { isResponseSuccess } from "../../Utils/helperFunctions";
import LoadingSpinner from "../../components/LoadingSpinner";

const DisplayData = () => {
  const { heading } = useStyles();
  const [edit, setEdit] = useState(false); 
  const [id,setId] = useState(null)
  const link = "https://api.themagnit.com/v1/Reviews"
  // const {deleteItem,data,loader,open,toastType,handleToastClose,responseAlert} = useApi(link)
  const [loader, setLoader] = useState(false);
  const [responseAlert, setResponseAlert] = useState({status:"", message:""})
  const [open, setOpen] = useState()
  const [toastType, setToastType] = useState()
  const [data, setData] = useState()
  const valueskeys = {
    title: "clientName",
    _id: "_id"
  }

  const deleteItem=(id)=>{
    deleteReview(id).then(response=>{
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

  useEffect(()=>{
    getAllReviews().then(response=>{
      if(isResponseSuccess(response)){
        setToastType('success')
        setResponseAlert({
          status: response.data.status,
          message: response.statusText
        })
        setData(response.data.data.result)
      }else{
        setToastType('error')
        setResponseAlert({
          status: response.response.data.status,
          message: response.response.data.message
        })
      }
      setOpen(true)
    })
  },[])
  if(!data){
    return <LoadingSpinner open={!data}/>
  }
  return (
    <div>
      {!edit ? 
      <Grid justify="center" container>
        <Grid className={heading} item lg={12} xs={12}>
          <Typography variant="h4">Reviews Data</Typography>
        </Grid>
        <Grid item lg={12}>
          <AddData /> 
        </Grid>
        <Loader open={loader} />
        {responseAlert && (
            <Toast
              open={open}
              severity={toastType}
              message={responseAlert.message}
              onClose={()=>setOpen(false)}
            />
          )}
        <Table
            rows={data}
            handleDelete={deleteItem}
            handleUpdate={setId}
            edit={setEdit}
            valueskeys={valueskeys}
          />
      </Grid>
      :  <Grid justify="center" container>
      <Grid className={heading} item lg={12} xs={12}>
        <Typography variant="h4">Edit Data</Typography>
      </Grid>
      <Grid item lg={12}>
        <EditData id={id} edit={setEdit}/>
      </Grid>
    </Grid>}
    </div>
  );
};

export default DisplayData;
