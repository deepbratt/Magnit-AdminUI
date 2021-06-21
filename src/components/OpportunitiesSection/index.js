import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddOpportunities from "./addOpportunities";

const Opportunities = () => {
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
          name="Opportunities Section"
          handleClick={handleClickOpen}
        />

        <AddOpportunities open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default Opportunities;
