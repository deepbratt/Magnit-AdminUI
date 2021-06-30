import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import DateField from "../AdminPanelBlogs/DateContext"
const TextFieldContext = ({
  clientName,
  projectName,
  projectType,
  review,
  rating,
  inputChange,
  setFile,
  errors,
  edit,
  date,
  setDate,
  setCFile
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
         {!edit?
          <p style={{ color: "red" }}>{errors.clientName}</p>: null}
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
           {!edit ?
          <p style={{ color: "red" }}>{errors.projectName}</p> : null}
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
           {!edit ?
          <p style={{ color: "red" }}>{errors.projectType}</p>: null}
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
           {!edit ?
          <p style={{ color: "red" }}>{errors.review}</p>: null}
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
          {!edit ?
          <p style={{ color: "red" }}>{errors.rating}</p>: null}
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Project Image</InputLabel>
        <TextField
          variant="outlined"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Client Image</InputLabel>
        <TextField
          variant="outlined"
          type="file"
          name="file"
          onChange={(e) => setCFile(e.target.files[0])}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={11} md={5} sm={10} xs={12}>
        <InputLabel style={{ marginLeft: "30px" }} className={labels}>
          Choose Date
        </InputLabel>
        <DateField date={date} setDate={setDate} />
      </Grid>
    </>
  );
};

export default TextFieldContext;
