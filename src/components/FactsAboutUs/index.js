import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddFactsAboutUs from "./addFactsAboutUs";

const FactsAboutUsSection = () => {
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
          name="Facts About Us Section"
          handleClick={handleClickOpen}
        />

        <AddFactsAboutUs open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default FactsAboutUsSection;
