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
    "http://api.themagnit.com/v1adminPanel"
  );
  const { grid, btn } = useStyles();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    description: "",
  });

  const { description } = data;
  const {} = validate(data);
  const [errors, setErrors] = useState({});
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formData = new FormData();
  formData.append("image", file);
  formData.append("description", description);

  const handleSubmit = () => {
    const validationErrors = validate(data);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      addData(formData);
      setData({
        description: "",
      });
    } else {
      return <p>errors try again</p>;
    }
  };

  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          text={description}
          inputChange={inputChange}
          setFile={setFile}
          errors={errors}
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
        <Grid item style={{ marginTop: "20px" }}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            className={btn}
          >
            Add Data
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setData({
                description: "",
              });
            }}
            variant="contained"
            color="secondary"
            style={{ marginLeft: "15px", marginTop: "20px" }}
          >
            Clear Field
          </Button>
        </Grid>
      </Grid>

      <Grid item style={{ marginBottom: "30px" }}>
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
        ) : <Alert severity="info">Status: pending</Alert>}
      </Grid>
    </>
  );
};

export default AddData;
