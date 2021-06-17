import { Typography, Grid } from "@material-ui/core";
import ServicesSection from "../../components/ServicesSection";
import OurWorkSection from "../../components/OurWorkSection";
import BannersSection from "../../components/Banners";
import HiringOptions from "../../components/HiringOptions";
import Opportunities from "../../components/OpportunitiesSection";

const ModerateSections = () => {
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
        <Grid item xs={3}>
          <BannersSection />
        </Grid>
        <Grid item xs={3}>
          <HiringOptions />
        </Grid>
        <Grid item xs={3}>
          <Opportunities />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ModerateSections;
