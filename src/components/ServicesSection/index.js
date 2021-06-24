import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddServices from "./addServices";
import {
  deleteServiceApi,
  getAllServicesApi,
  getOneServicesApi,
} from "../../Utils/servicesSectionApi";
const ServicesSection = () => {
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
        <NewItemButton name="Services Section" handleClick={handleClickOpen} />

        <AddServices 
        getAllServicesApi={getAllServicesApi}
        getOneServicesApi={getOneServicesApi}
        deleteServiceApi={deleteServiceApi}
        header="Manage Services Section"
        open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default ServicesSection;
