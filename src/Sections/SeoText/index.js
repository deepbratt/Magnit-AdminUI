import { Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataTable from "../../components/Table.js";
import Toast from "../../components/Toast";
import { serverResponseMessages } from "../../Utils/formConstants.js";
import {
  isResponseSuccess,
  isUnauthorized,
} from "../../Utils/helperFunctions.js";
import { deleteSeoText, getAllSeoText } from "../../Utils/loginApi.js";
import SeoTextForm from "./seoTextForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice.js";

const SeoText = () => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  const deleteItem = (id) => {
    setIsLoading(true);
    deleteSeoText(id).then((response) => {
      if (isResponseSuccess(response)) {
        setToastType("success");
        setResponseMessage("success");
        let temp = dataArray;
        temp = temp.filter((item) => item._id !== id);
        console.log(temp);
        setDataArray(temp);
      } else {
        setToastType("error");
        setResponseMessage("error");
      }
      setOpenToast(true);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllSeoText().then((response) => {
      if (isResponseSuccess(response)) {
        console.log(response);
        setDataArray(response.data.data.result);
      } else {
        setToastType("error");
        setResponseMessage("error");
        setOpenToast(true);
        if (isUnauthorized(response)) {
          dispatch(logout());
        }
      }
      setIsLoading(false);
    });
  }, []);
  return (
    <Grid container>
      <LoadingSpinner open={isLoading} />
      <Grid item xs={12}>
        <SeoTextForm
          itemId={itemId}
          clearItemId={() => setItemId("")}
          setDataArray={setDataArray}
          dataArray={dataArray}
          setOpenToast={setOpenToast}
          setToastType={setToastType}
          setResponseMessage={setResponseMessage}
          setIsLoading={setIsLoading}
        />
      </Grid>
      <Grid item xs={12}>
        {/* table */}
        <DataTable
          rows={dataArray}
          handleDelete={deleteItem}
          handleUpdate={setItemId}
          // edit={() => console.log(dataArray)}
        />
      </Grid>
      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        severity={toastType}
        message={responseMessage}
      />
    </Grid>
  );
};

export default SeoText;
