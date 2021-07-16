import { Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from "react";
import Toast from "../../components/Toast";
import useSeoText from "./useSeoText";

const SeoTextForm = ({
  clearItemId,
  dataArray,
  setDataArray,
  itemId,
  setIsLoading,
  setToastType,
  setOpenToast,
  setResponseMessage,
}) => {
  const { handleChange, formData, clearFields, handleSubmit } = useSeoText(
    itemId,
    clearItemId,
    setDataArray,
    dataArray,
    setIsLoading,
    setToastType,
    setOpenToast,
    setResponseMessage
  );
  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            type="text"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="h1Detail"
            label="h1 detail"
            type="text"
            variant="outlined"
            value={formData.h1Detail}
            onChange={handleChange}
            style={{ width: "100%" }}
            multiline
            row={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="h2Detail"
            label="h2 detail"
            type="text"
            variant="outlined"
            value={formData.h2Detail}
            onChange={handleChange}
            style={{ width: "100%" }}
            multiline
            row={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={clearFields}>
            Discard
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SeoTextForm;
