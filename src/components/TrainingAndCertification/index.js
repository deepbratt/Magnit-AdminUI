import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddTrainingAndCertification from "./addTrainingAndCertification";

const TrainingAndCertification = () => {
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
          name="Training And Certification Section"
          handleClick={handleClickOpen}
        />

        <AddTrainingAndCertification open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default TrainingAndCertification;
