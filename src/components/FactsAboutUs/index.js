import { Grid } from "@material-ui/core";
import AddFactsAboutUs from "./addFactsAboutUs";

const FactsAboutUsSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddFactsAboutUs header="Manage Facts About Us Section" />
      </Grid>
    </Grid>
  );
};

export default FactsAboutUsSection;
