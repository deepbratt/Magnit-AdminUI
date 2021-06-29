import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";

const TextFieldContext = ({ title, inputChange, setFile, errors, edit }) => {
  const { labels, common } = useStyles();
  return (
    <>
      <Grid container justify="center">
        <Grid className={common} item lg={7} md={5} sm={10} xs={12}>
          <InputLabel className={labels}>Image</InputLabel>
          <TextField
            variant="outlined"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid className={common} item lg={7} md={5} sm={10} xs={12}>
          <InputLabel className={labels}>Title</InputLabel>
          <TextField
            variant="outlined"
            value={title}
            name="title"
            onChange={(e) => inputChange(e)}
            style={{ width: "100%" }}
          />
          {!edit ? <p style={{ color: "red" }}>{errors.title}</p> : null}
        </Grid>
      </Grid>
    </>
  );
};

export default TextFieldContext;
