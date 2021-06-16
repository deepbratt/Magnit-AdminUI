import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddBanners from "./addBanners";

const BannersSection = () => {
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
        <NewItemButton name="Banner Section" handleClick={handleClickOpen} />

        <AddBanners open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default BannersSection;
