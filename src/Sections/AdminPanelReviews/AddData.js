import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
import validate from "./useValidate";
const AddData = () => {
  const { addData, isPending, responseAlert, open, setOpen,toastType } = useApi(
    "http://api.themagnit.com/v1/Reviews"
  );
  const { grid, btn } = useStyles();
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({
    clientName: "",
    projectName: "",
    projectType: "",
    review: "",
    rating: 0,
  });
  const { clientName, projectName, projectType, review, rating } = data;
  const {} = validate(data);
  const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append("clientName", clientName);
  formData.append("projectName", projectName);
  formData.append("projectType", projectType);
  formData.append("review", review);
  formData.append("Date", date);
  formData.append("image", file);
  formData.append("clientImage", file);
  formData.append("rating", rating);

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = () => {
    const validationErrors = validate(data);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      addData(formData);
      setData({
        clientName: "",
        projectName: "",
        projectType: "",
        review: "",
        rating: 0,
      });
    } else {
      return <p>errors try again</p>;
    }
  };

  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          clientName={clientName}
          projectName={projectName}
          projectType={projectType}
          review={review}
          rating={rating}
          inputChange={inputChange}
          setFile={setFile}
          errors={errors}
          date={date}
          setDate={setDate}
        />
      </Grid>
      <Grid
        item
        lg={12}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
        <Grid item>
          <Button
            onClick={() => {
              setData({
                clientName: "",
                projectName: "",
                projectType: "",
                review: "",
                rating: 0,
              });
            }}
            variant="contained"
            color="secondary"
            style={{ marginLeft: "15px" }}
          >
            Clear Field
          </Button>
        </Grid>
      </Grid>
      {responseAlert && (
        <Toast
          open={open}
          severity={toastType}
          message={responseAlert.message}
          onClose={handleToastClose}
        />
      )}
      {!isPending ? (
        <Alert severity="success">Status: Added successfully!</Alert>
      ) :  <Alert severity="info">Status: pending</Alert>}
    </>
  );
};

export default AddData;
