import { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import NewItemButton from "../../components/NewItemButton";
import AddNewPage from "./addNewPage";

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
        <Typography variant="h4" gutterBottom>
          Pages
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <NewItemButton handleClick={handleClickOpen} />

        <AddNewPage open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default ModeratePages;
