import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
const TextFieldContext = ({ link, text, buttonLabel, inputChange }) => {
  const { labels, common } = useStyles();
  return (
    <>
      <Grid container justify="center" style={{ marginBottom: "20px" }}>
        <Grid className={common} item lg={6} md={5} sm={10} xs={12}>
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
        </Grid>
        <Grid className={common} item lg={6} md={5} sm={10} xs={12}>
          <InputLabel className={labels}>Link</InputLabel>
          <TextField
            variant="outlined"
            type="text"
            name="link"
            value={link}
            onChange={(e) => inputChange(e)}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid className={common} item lg={6} md={5} sm={10} xs={12}>
          <InputLabel className={labels}>Button Label</InputLabel>
          <TextField
            variant="outlined"
            type="text"
            name="buttonLabel"
            value={buttonLabel}
            onChange={(e) => inputChange(e)}
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TextFieldContext;
