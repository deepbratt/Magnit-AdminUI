import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "./useStyles";

const TextFieldContext = ({ head, btn, inputChange, link, setFile }) => {
  const { labels, common } = useStyles();
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Heading</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="heading"
          value={head}
          required
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Link</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="link"
          value={link}
          required
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Button Label</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="button"
          value={btn}
          required
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Image</InputLabel>
        <TextField
          variant="outlined"
          type="file"
          required
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "100%" }}
        />
      </Grid>
    </>
  );
};

export default TextFieldContext;
