import { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddServices from "./addServices";

const ModeratePages = () => {
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
        <NewItemButton name="Services Section" handleClick={handleClickOpen} />

        <AddServices open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default ModeratePages;
