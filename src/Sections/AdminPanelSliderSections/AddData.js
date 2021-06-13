import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import ListItems from "./ListItems";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./useStyles";
import useApi from "../../Utils/useApi";

const AddData = () => {
  const { addData, isPending } = useApi("http://3.138.190.235/v1/sliders");
  const { grid, btn } = useStyles();
  const [list, setList] = useState("");
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const [data, setData] = useState({
    title: "",
    buttonLink: "",
    buttonLabel: "",
  });
  const { title, buttonLabel, buttonLink } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const InputChange = (e) => {
    setList(e.target.value);
  };

  const add = () => {
    if (list !== "") {
      setArray((prevData) => {
        return [...prevData, list];
      });
    }
  };

  const formData = new FormData();
  formData.append("backgroundImage", file);
  formData.append("title", title);
  formData.append("items", array);
  formData.append("buttonLabel", buttonLabel);
  formData.append("buttonLink", buttonLink);

  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <TextFieldContext
          title={title}
          buttonLabel={buttonLabel}
          inputChange={inputChange}
          buttonLink={buttonLink}
          setFile={setFile}
        />
        <ListItems
          handleAddList={add}
          value={list}
          arr={array}
          input={InputChange}
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
