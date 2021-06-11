import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import EditList from "./EditList";
import TextFieldContext from "./TextFieldContext";
export default function EditData() {
  const [list, setList] = useState("");
  const [file, setFile] = useState(null);
  const [array, setArray] = useState(["list", "list", "list"]);
  const [data, setData] = useState({
    heading: "",
    button: "",
    link: "",
  });
  const { heading, button, link } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <Grid justify="center" container>
        <form
          // onSubmit={(e) => updateData(e, id, items)}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          autoComplete="off"
        >
          <Grid
            style={{
              display: "flex",
              flexFlow: "wrap",
              justifyContent: "center",
              marginTop: "13px",
            }}
            lg={12}
            item
            xs={12}
          >
            <TextFieldContext
              head={heading}
              btn={button}
              inputChange={inputChange}
              link={link}
              setFile={setFile}
            />
            <EditList arr={array} setArr={setArray} />
            <Grid item>
              <Button
                type="submit"
                onClick={() => {
                  console.log(file);
                }}
                variant="contained"
                color="primary"
              >
                Update Data
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "30px" }}>
          <Alert severity="info">Status: pending!</Alert>
        </Grid>
      </Grid>

      {/* {isPending ? (
            <Alert severity="info">Status: pending!</Alert>
          ) : (
            <Alert severity="success">Status: updated successfully!</Alert>
          )} */}
    </div>
  );
}
