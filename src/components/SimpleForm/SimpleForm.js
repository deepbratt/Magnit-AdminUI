import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import useSimpleForm from "./useSimpleForm";
import LoadingSpinner from "../LoadingSpinner";
import Toast from "../Toast";

const SimpleForm = ({
  itemId,
  clearItemId,
  createApi,
  updateApi,
  getItemApi,
  updateDataArray,
  dataArray
}) => {
  const { handleChange, handleSubmit, formData, clearFields, isLoading, openToast, setOpenToast, toastType, responseMessage } = useSimpleForm(
    itemId,
    clearItemId,
    createApi,
    updateApi,
    getItemApi,
    updateDataArray,
    dataArray
  );
  return (
    <form onSubmit={handleSubmit}>
      <LoadingSpinner open={isLoading}/>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="title"
            label="Title"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData.title}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="text"
            label="Text"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData.text}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          container
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={6}>
            <Button variant="contained" component="label">
              Upload Icon
              <input name="image" type="file" hidden onChange={handleChange} />
            </Button>
            {/* <TextField
              variant="outlined"
              type="file"
              name="image"
              onChange={handleChange}
              style={{ width: "100%" }}
            /> */}
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex" }}
            container
            justify="center"
          >
            <div>
              {typeof formData.image === "string" ? (
                <img src={formData.image} height="auto" width="100px" alt="" />
              ) : formData.image && typeof formData !== "string" ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  height="auto"
                  width="100px"
                  alt=""
                />
              ) : (
                ""
              )}
              {/* {itemId && <img src={formData.image} height="auto" width="100px" />} */}
            </div>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2}>
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

SimpleForm.defaultProps = {
  itemId: "",
};

export default SimpleForm;
