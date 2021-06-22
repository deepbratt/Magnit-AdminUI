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
            value={formData.title}
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
            value={formData.text}
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
