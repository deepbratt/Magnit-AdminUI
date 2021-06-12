import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import useHowWorksForm from "./useHowWorksForm";

const HowWorkForm = ({ itemId, clearItemId }) => {
  const { handleChange, handleSubmit, formData,  clearFields  } = useHowWorksForm(itemId, clearItemId);
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
              {/* <img src={formData.image && URL.createObjectURL(formData.image)} height="auto" width="100px" />
              <img src={itemId && formData.image} height="auto" width="100px" /> */}
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


HowWorkForm.defaultProps = {
  itemId: "",
};

export default HowWorkForm;
