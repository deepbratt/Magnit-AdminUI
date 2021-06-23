/*
itemId, =====> itemid sent as a prop when editing
  clearItemId, ====> clearing itemId on HOC
  createApi, =======> create api func sent from HOC
  updateApi, =======> update api func sent from HOC
  getItemApi, =======> get single item for editing api func sent from HOC
  updateDataArray, =====> update state (set state func) to update the data array after editing
  dataArray, ====> array of data (state) that needs to be updated
  apiFieldNames,  =====> json keys/fieldnames used in apis to send and recieve json data
*/
import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import useOnlyTextForm from "./useOnlyTextForm";
import LoadingSpinner from "../LoadingSpinner";
import Toast from "../Toast";

const OnlyTextForm = ({
  itemId,
  clearItemId,
  createApi,
  updateApi,
  getItemApi,
  updateDataArray,
  dataArray,
  apiFieldNames,
}) => {
  const { handleChange, handleSubmit, formData, clearFields, isLoading, openToast, setOpenToast, toastType, responseMessage } = useOnlyTextForm(
    itemId,
    clearItemId,
    createApi,
    updateApi,
    getItemApi,
    updateDataArray,
    dataArray,
    apiFieldNames
  );
  return (
    <form onSubmit={handleSubmit}>
      <LoadingSpinner open={isLoading}/>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <TextField
            name={apiFieldNames.title}
            label={apiFieldNames.title.toUpperCase()}
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData[apiFieldNames.title] || ""}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={apiFieldNames.text}
            label={apiFieldNames.text.toUpperCase()}
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData[apiFieldNames.text] || ""}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6} container justify="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={clearFields}>
              Discard
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Toast
          open={openToast}
          onClose={() => setOpenToast(false)}
          severity={toastType}
          message={responseMessage}
        />
    </form>
  );
};

OnlyTextForm.defaultProps = {
  itemId: "",
};

export default OnlyTextForm;
