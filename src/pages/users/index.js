import { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import AddNewUser from "./addNewUser";
import NewItemButton from "../../components/NewItemButton";
import DataTable from "../../components/Table.js";

const Users = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Add New User
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddNewUser open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default Users;
