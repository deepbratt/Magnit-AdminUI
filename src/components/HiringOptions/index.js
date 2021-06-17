import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddHiringOptions from "./addHiringOptions";

const HiringOptions = () => {
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
        <NewItemButton name="Hiring Options Section" handleClick={handleClickOpen} />

        <AddHiringOptions open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default HiringOptions;
