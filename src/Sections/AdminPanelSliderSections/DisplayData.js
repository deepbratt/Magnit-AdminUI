import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "./useStyles";
import AddData from "./AddData"
import EditData from "./EditData"
import Table from "../../components/Table"
const DisplayData = ({ array }) => {
  const { heading } = useStyles();
  const [edit, setEdit] = useState(false);
  console.log(array)
  return (
    <div>
      <Grid justify="center" container>
        <Grid className={heading} item lg={12} xs={12}>
          <Typography variant="h4">Home Slider Data</Typography>
        </Grid>
        <Grid item lg={12}>
          {!edit ? <AddData/> : <EditData/>}
        </Grid>
        <Table dataArray={array} edit={setEdit}/>
      </Grid>
    </div>
  );
};

export default DisplayData;
