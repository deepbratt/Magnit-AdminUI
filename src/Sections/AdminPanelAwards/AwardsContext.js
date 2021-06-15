import React, { useState } from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./useStyles";
import AddData from "./AddData"
import EditData from "./EditData"
import Table from "../../components/Table"
const DisplayData = ({ array }) => {
  const { heading } = useStyles();
  const [edit, setEdit] = useState(false); 
  const [id,setId] = useState(null)
  const link = "http://3.138.190.235/v1/awards"
  return (
    <div>
      {!edit ? 
      <Grid justify="center" container>
        <Grid className={heading} item lg={12} xs={12}>
          <Typography variant="h4">Awards Data</Typography>
        </Grid>
        <Grid item lg={12}>
          <AddData /> 
        </Grid>
        <Table dataArray={array} url={link} edit={setEdit} handleId={setId}/>
      </Grid>
      :  <Grid justify="center" container>
      <Grid className={heading} item lg={12} xs={12}>
        <Typography variant="h4">Edit Data</Typography>
      </Grid>
      <Grid item lg={12}>
        <EditData id={id} edit={setEdit}/>
      </Grid>
    </Grid>}
    </div>
  );
};

export default DisplayData;
