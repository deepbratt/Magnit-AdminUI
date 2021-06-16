import { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import NewItemButton from "../../components/NewItemButton";
import ServicesSection from "../../components/ServicesSection";
import OurWorkSection from "../../components/OurWorkSection";

const ModerateSections = () => {
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
          Available Sections/Components
        </Typography>
      </Grid>
      <Grid item container justify="flex-start" alignContent="center">
        <Grid item xs={3}>
          <ServicesSection />
        </Grid>
        <Grid item xs={3}>
          <OurWorkSection />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ModerateSections;
