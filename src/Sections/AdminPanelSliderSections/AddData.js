import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import ListItems from "./ListItems";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./useStyles";
const AddData = () => {
  const { grid, btn } = useStyles();
  const [list, setList] = useState("");
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const [data, setData] = useState({
    heading: "",
    button: "",
    link: "",
  });
  const { heading, button, link } = data;
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

  // const items = {
  //     heading: heading,
  //     img: file,
  //     list: array,
  //     link: link,
  //     button: button,
  //   };
  return (
    <>
      <form
        // onSubmit={(e) => updateData(e, id, items)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete="off"
      >
        <Grid className={grid} lg={12} item xs={12}>
          <TextFieldContext
            head={heading}
            btn={button}
            inputChange={inputChange}
            link={link}
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
            type="submit"
            onClick={() => {
              console.log(array);
            }}
            variant="contained"
            className={btn}
          >
            Add Data
          </Button>
        </Grid>
        <Alert severity="info">Status: pending!</Alert>

        {/* {isPending ? (
            <Alert severity="info">Status: pending!</Alert>
          ) : (
            <Alert severity="success">Status: updated successfully!</Alert>
          )} */}
      </form>
    </>
  );
};

export default AddData;
