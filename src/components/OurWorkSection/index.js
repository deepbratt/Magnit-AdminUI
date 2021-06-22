import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddOurWork from "./addOurWork";

const OurWorkSection = () => {
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
        <NewItemButton name="Our Work Section" handleClick={handleClickOpen} />
        <AddOurWork open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default OurWorkSection;
