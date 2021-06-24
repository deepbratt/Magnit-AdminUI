import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "./useStyles";

const TextFieldContext = ({
  clientName,
  link,
  inputChange,
  setFile,
  errors,
  edit
}) => {
  const { labels, common } = useStyles();
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>ClientName</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="clientName"
          value={clientName}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
        {!edit ? <p style={{ color: "red" }}>{errors.clientName}</p> : null}
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Link</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="link"
          value={link}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
        {!edit ? <p style={{ color: "red" }}>{errors.link}</p> : null}
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
