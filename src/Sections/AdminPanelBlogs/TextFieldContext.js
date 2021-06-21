import React from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import DateField from "./DateContext";
const TextFieldContext = ({
  title,
  link,
  text,
  views,
  buttonLabel,
  inputChange,
  setFile,
  date,
  setDate,
  errors
}) => {
  const { labels, common } = useStyles();
  return (
    <>
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
        <InputLabel className={labels}>Link</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="link"
          value={link}
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
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Views</InputLabel>
        <TextField
          variant="outlined"
          type="number"
          name="views"
          value={views}
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
