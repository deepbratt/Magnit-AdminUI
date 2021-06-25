import { Grid } from "@material-ui/core";
import AddServices from "./addServices";
import {
  deleteServiceApi,
  getAllServicesApi,
  getOneServicesApi,
} from "../../Utils/servicesSectionApi";

const ServicesSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddServices
          getAllServicesApi={getAllServicesApi}
          getOneServicesApi={getOneServicesApi}
          deleteServiceApi={deleteServiceApi}
          header="Manage Services Section"
        />
      </Grid>
    </Grid>
  );
};

export default ServicesSection;
