import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
const AddData = () => {
  const { addData, isPending,responseAlert,open,setOpen } = useApi("http://3.138.190.235/v1/ourObjectives");
  const { grid, btn } = useStyles();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    text: "",
  });
  const {title,text} = data;
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
  formData.append("icon", file);
  formData.append("title", title);
  formData.append("text", text);

  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          title={title}
          text={text}
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
              title: "",
              text: "",
            })
          }}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
        <Button
          onClick={() => {
            setData({
              title: "",
              text: "",
            })
          }}
          variant="contained"
          color="secondary"
          style={{marginLeft: "15px"}}
        >
         Clear Field
        </Button>
      </Grid>
      <Grid item style={{marginBottom: "30px"}}>
      {responseAlert && (
          <Toast
            open={open}
            severity={responseAlert.status}
            message={responseAlert.message}
            onClose={handleToastClose}
          />
        )}
           {!isPending ?   <Alert severity="success">Status: Added successfully!</Alert> : null}
      </Grid>
    </>
  );
};

export default AddData;
