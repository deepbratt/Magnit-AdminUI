import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "./useStyles";

const TextFieldContext = ({
  title,
  buttonLabel,
  inputChange,
  buttonLink,
  setFile,
  errors
}) => {
  const { labels, common } = useStyles();
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Heading</InputLabel>
        <TextField
          variant="outlined"
          required
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
        <InputLabel className={labels}>Link</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="buttonLink"
          value={buttonLink}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
          {errors.link && (
          <p style={{ color: "red" }}>{errors.link}</p>
        )}
      </Grid>

      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Button Label</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="buttonLabel"
          value={buttonLabel}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
          {errors.buttonLabel && (
          <p style={{ color: "red" }}>{errors.buttonLabel}</p>
        )}
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Image</InputLabel>
        <TextField
          variant="outlined"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "100%" }}
        />
      </Grid>
    </>
  );
};

export default TextFieldContext;
