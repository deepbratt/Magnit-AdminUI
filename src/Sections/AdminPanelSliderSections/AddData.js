import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import ListItems from "./ListItems";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./useStyles";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
import validate from "./useValidate";
const AddData = () => {
  const { addData, isPending ,responseAlert,open,setOpen} = useApi("http://3.138.190.235/v1/sliders");
  const { grid, btn } = useStyles();
  let id = "form";
  const [list, setList] = useState("");
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const [data, setData] = useState({
    title: "",
    buttonLink: "",
    buttonLabel: "",
  });
  const { title, buttonLabel, buttonLink } = data;
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



  const InputChange = (e) => {
    setList(e.target.value);
  };

  const add = () => {
    setArray((prevData) => {
      return [...prevData, list];
    });
    document.getElementById("form").reset();
  };

  const formData = new FormData();
  formData.append("backgroundImage", file);
  formData.append("title", title);
  formData.append("items", array);
  formData.append("buttonLabel", buttonLabel);
  formData.append("buttonLink", buttonLink);


  const handleSubmit = () => {
    const validationErrors = validate(data);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      addData(formData);
      setData({
        title: "",
        buttonLink: "",
        buttonLabel: "",
      })
    } else {
      return <p>errors try again</p>;
    }
  };


  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          title={title}
          buttonLabel={buttonLabel}
          inputChange={inputChange}
          buttonLink={buttonLink}
          setFile={setFile}
          errors={errors}
        />

        <ListItems
          handleAddList={add}
          value={list}
          arr={array}
          input={InputChange}
          setArr={setArray}
          id={id}
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
          onClick={() => handleSubmit()}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
        <Button
          onClick={() => {
            setData({
              title: "",
              buttonLink: "",
              buttonLabel: "",
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
