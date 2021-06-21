import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
const AddData = () => {
  const { addData, isPending,responseAlert,open,setOpen } = useApi("http://3.138.190.235/v1/adminPanel");
  const { grid, btn } = useStyles();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    description: "",
  });
  const {description} = data;
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

  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          text={description}
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
        <Grid item style={{marginTop: "20px"}}>
        <Button
          onClick={() => {
            addData(formData);
            setData({
              description: ""
            })
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
              description: ""
            })
          }}
          variant="contained"
          color="secondary"
          style={{marginLeft: "15px", marginTop: "20px"}}
        >
         Clear Field
        </Button>
       </Grid>
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
