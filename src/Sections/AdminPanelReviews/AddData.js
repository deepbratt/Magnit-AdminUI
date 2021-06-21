import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
const AddData = () => {
  const { addData, isPending, responseAlert, open, setOpen } = useApi(
    "http://3.138.190.235/v1/Reviews"
  );
  const { grid, btn } = useStyles();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    clientName: "",
    projectName: "",
    projectType: "",
    review: "",
    rating: 0,
  });
  const { clientName, projectName, projectType, review, rating } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append("clientName", clientName);
  formData.append("projectName", projectName);
  formData.append("projectType", projectType);
  formData.append("review", review);
  formData.append("image", file);
  formData.append("rating", rating);

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
            addData(formData);
            setData({
              clientName: "",
              projectName: "",
              projectType: "",
              review: "",
              rating: 0,
            });
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
          severity={responseAlert.status}
          message={responseAlert.message}
          onClose={handleToastClose}
        />
      )}
      {!isPending ? (
        <Alert severity="success">Status: Added successfully!</Alert>
      ) : null}
    </>
  );
};

export default AddData;
