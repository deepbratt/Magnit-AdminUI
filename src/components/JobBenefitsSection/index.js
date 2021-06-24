import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewItemButton from "../NewItemButton";
import AddServices from "../ServicesSection/addServices";
import {
  deleteBenefitsApi,
  getAllBenefitsApi,
  getOneBenefitsApi,
} from "../../Utils/jobBenefitsSectionApi";
const JobBenefitsSection = () => {
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
        <NewItemButton name="Job Benefits Section" handleClick={handleClickOpen} />

        <AddServices
                getAllServicesApi={getAllBenefitsApi}
                getOneServicesApi={getOneBenefitsApi}
                deleteServiceApi={deleteBenefitsApi}
                header="Manage Job Benefits Section"
        open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
};

export default JobBenefitsSection;
