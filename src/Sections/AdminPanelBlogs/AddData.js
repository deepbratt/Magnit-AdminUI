import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
import validate from "./useValidate";
const AddData = () => {
  const { addData, isPending,responseAlert,open,setOpen,toastType } = useApi("http://3.138.190.235/v1/blogs");
  const [date, setDate] = useState(new Date());
  const { grid, btn } = useStyles();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    link: "",
    text: "",
    buttonLabel: "",
    views: 0
  });
  const { title, link ,text,buttonLabel,views} = data;
  const {} = validate(data);
  const [errors, setErrors] = useState({});
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData()
  formData.append("views", views)
  formData.append("date", date)
  formData.append("image", file)
  formData.append("title", title)
  formData.append("text", text)
  formData.append("link", link)
  formData.append("buttonLabel", buttonLabel)

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
        title: "",
        link: "",
        text: "",
        buttonLabel: "",
        views: 0
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
          link={link}
          buttonLabel={buttonLabel}
          text={text}
          views={views}
          inputChange={inputChange}
          setFile={setFile}
          setDate={setDate}
          date={date}
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
            handleSubmit()
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
              title: "",
              link: "",
              text: "",
              buttonLabel: "",
              views: 0
            })
          }}
          variant="contained"
          color="secondary"
          style={{marginLeft: "15px"}}
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
           {!isPending ?   <Alert severity="success">Status: Added successfully!</Alert>
            :  <Alert severity="info">Status: pending</Alert>}
    </>
  );
};

export default AddData;
