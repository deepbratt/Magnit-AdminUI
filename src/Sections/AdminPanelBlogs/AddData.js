import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
const AddData = () => {
  const { addData, isPending } = useApi("http://3.138.190.235/v1/blogs");
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
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData()
  formData.append("views", views)
  formData.append("image", file)
  formData.append("title", title)
  formData.append("text", text)
  formData.append("link", link)
  formData.append("buttonLabel", buttonLabel)

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
      {isPending ? (
        <Alert severity="info">Status: pending!</Alert>
      ) : (
        <Alert severity="success">Status: Added successfully!</Alert>
      )}
    </>
  );
};

export default AddData;
