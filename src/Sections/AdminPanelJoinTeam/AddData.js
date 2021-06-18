import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi"
const AddData = () => {
  const {handleAddData,isPending} = useApi()
  const { grid, btn } = useStyles();
  const [data, setData] = useState({
    text: "",
    link: "",
    buttonLabel: "",
  });
  const {link ,text,buttonLabel} = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  
  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          link={link}
          buttonLabel={buttonLabel}
          text={text}
          inputChange={inputChange}
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
            handleAddData(text,link,buttonLabel)
          }}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
      </Grid>
      {isPending ? (
        <Alert severity="info">Status: pending!</Alert>
      ) : (
        <Alert severity="success">Status: Added successfully!</Alert>
      )}
    </>
  );
};

export default AddData;
