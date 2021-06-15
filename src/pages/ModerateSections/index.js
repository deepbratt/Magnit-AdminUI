import { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import NewItemButton from "../../components/NewItemButton";
import ServicesSection from "../../components/ServicesSection";

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
          Available Sections/Components
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ServicesSection />
      </Grid>
    </Grid>
  );
};

export default ModeratePages;
