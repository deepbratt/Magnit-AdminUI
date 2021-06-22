import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
import validate from "./useValidate";
const AddData = () => {
  const { handleAddData, isPending, responseAlert, open, setOpen,toastType } = useApi();
  const { grid, btn } = useStyles();
  const [data, setData] = useState({
    text: "",
    link: "",
    buttonLabel: "",
  });

  const { link, text, buttonLabel } = data;
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

  const handleSubmit = () => {
    const validationErrors = validate(data);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      handleAddData(text, link, buttonLabel);
    } else {
      return <p>errors try again</p>;
    }
  };

  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          link={link}
          buttonLabel={buttonLabel}
          text={text}
          inputChange={inputChange}
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
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
        <Button
          onClick={() => {
            setData({
              text: "",
              link: "",
              buttonLabel: "",
            });
          }}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "15px" }}
        >
          Clear Field
        </Button>
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
      ) : null}
    </>
  );
};

export default AddData;
