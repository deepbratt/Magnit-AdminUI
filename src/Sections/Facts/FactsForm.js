import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import useFactsForm from "./useFactsForm";

const FactsForm = ({ itemId, clearItemId }) => {
  const { handleChange, handleSubmit, formData,  clearFields  } = useFactsForm(itemId, clearItemId);
  return (
    <form onSubmit={handleSubmit}>
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
              <input name="image" type="file" hidden onChange={handleChange}/>
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex" }}
            container
            justify="center"
          >
            <div>
              <img src={formData.image} height="auto" width="100px" />
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
    </form>
  );
};


FactsForm.defaultProps = {
  itemId: "",
};

export default FactsForm;
