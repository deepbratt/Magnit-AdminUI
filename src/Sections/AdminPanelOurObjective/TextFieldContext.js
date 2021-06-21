import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";

const TextFieldContext = ({
  title,
  text,
  inputChange,
  setFile,
  errors
}) => {
  const { labels, common } = useStyles();
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Icon</InputLabel>
        <TextField
          variant="outlined"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Title</InputLabel>
         <TextField
          variant="outlined"
          type="text"
          name="title"
          value={title}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
         {errors.title && (
          <p style={{ color: "red" }}>{errors.title}</p>
          )}
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Text</InputLabel>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          variant="outlined"
          value={text}
          name="text"
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
         {errors.text && (
          <p style={{ color: "red" }}>{errors.text}</p>
          )}
      </Grid>
    </>
  );
};

export default TextFieldContext;
