import React, { useState } from "react";
import { Grid, Button,TextField,InputLabel } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
const AddData = () => {
  const { addData, isPending } = useApi("http://3.138.190.235/v1/workflows");
  const { grid, btn,common,labels } = useStyles();
  const [file, setFile] = useState(null);


  const formData = new FormData();
  formData.append("image", file);


  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Image</InputLabel>
        <TextField
          variant="outlined"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "100%" }}
        />
      </Grid>
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
