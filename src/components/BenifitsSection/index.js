import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddBenifts from "./addBenifits";

const BenifitsSection = () => {
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
        <NewItemButton name="Benifits Section" handleClick={handleClickOpen} />

        <AddBenifts open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default BenifitsSection;
