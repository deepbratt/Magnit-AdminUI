import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
const TextFieldContext = ({
  clientName,
  projectName,
  projectType,
  review,
  rating,
  inputChange,
  setFile,
}) => {
  const { labels, common } = useStyles();
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Client Name</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="clientName"
          value={clientName}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Project Name</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="projectName"
          value={projectName}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Project Type</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="projectType"
          value={projectType}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Review</InputLabel>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          variant="outlined"
          value={review}
          name="review"
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Rating</InputLabel>
        <TextField
          variant="outlined"
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => inputChange(e)}
          style={{ width: "100%" }}
        />
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
