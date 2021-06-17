import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./useStyles";
import useApi from "../../Utils/useApi";

const AddData = () => {
  const { addData, isPending } = useApi("http://3.138.190.235/v1/awards");
  const { grid, btn } = useStyles();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    clientName: "",
    link: "",
  });
  const { title, link ,clientName} = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const formData = new FormData();
  formData.append("clientName", clientName);
  formData.append("image", file);
  formData.append("link", link);

  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          clientName={clientName}
          link={link}
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
          }}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
      </Grid>
      <Grid item style={{marginBottom: "30px"}}>
      {isPending ? (
        <Alert severity="info">Status: pending!</Alert>
      ) : (
        <Alert severity="success">Status: Added successfully!</Alert>
      )}
      </Grid>
    </>
  );
};

export default AddData;
