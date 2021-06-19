import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField
} from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import AddData from "./AddData"
import EditData from "./EditData"
import Table from "../../components/Table.js/index"
import useApi from "../../Utils/useApi"

const DisplayData = ({array}) => {
  const { heading } = useStyles();
  const [edit, setEdit] = useState(false); 
  const [id,setId] = useState(null)
  const link = "http://3.138.190.235/v1/companies"
  const {deleteItem} = useApi(link)
  const valueskeys = {
    title: "heading",
    _id: "_id"
  }

  return (
    <div>
      {!edit ? 
      <Grid justify="center" container>
        <Grid className={heading} item lg={12} xs={12}>
          <Typography variant="h4">Footer Data</Typography>
        </Grid>
        <Grid item lg={12}>
          <AddData /> 
        </Grid>
        <Table
            rows={array}
            handleDelete={deleteItem}
            handleUpdate={setId}
            edit={setEdit}
            valueskeys={valueskeys}
          />
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
