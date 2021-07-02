import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import AddData from "./AddData";
import EditData from "./EditData";
import Table from "../../components/Table.js/index";
import useApi from "../../Utils/useApi";
import Loader from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
const DisplayData = () => {
  const { heading } = useStyles();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const link = "http://api.themagnit.com/v1/blogs";
  const { deleteItem, data, loader, handleToastClose,open,responseAlert,toastType } = useApi(link);

  return (
    <div>
      {!edit ? (
        <Grid justify="center" container>
          <Grid className={heading} item lg={12} xs={12}>
            <Typography variant="h4">Blogs Data</Typography>
          </Grid>
          <Grid item lg={12}>
            <AddData />
          </Grid>
          <Loader open={loader} />
          {responseAlert && (
            <Toast
              open={open}
              severity={toastType}
              message={responseAlert.message}
              onClose={handleToastClose}
            />
          )}
          <Table
            rows={data}
            handleDelete={deleteItem}
            handleUpdate={setId}
            edit={setEdit}
          />
        </Grid>
      ) : (
        <Grid justify="center" container>
          <Grid className={heading} item lg={12} xs={12}>
            <Typography variant="h4">Edit Data</Typography>
          </Grid>
          <Grid item lg={12}>
            <EditData id={id} edit={setEdit} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DisplayData;
