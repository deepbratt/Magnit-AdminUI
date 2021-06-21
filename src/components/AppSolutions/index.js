import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddAppSolutions from "./addAppSolutions";

const AppSolutions = () => {
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
        <NewItemButton
          name="App Solutions Section"
          handleClick={handleClickOpen}
        />

        <AddAppSolutions open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default AppSolutions;
