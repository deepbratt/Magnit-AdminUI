import { Typography, Grid } from "@material-ui/core";
import OurWorkSection from "../../components/OurWorkSection";
import BannersSection from "../../components/Banners";
import HiringOptions from "../../components/HiringOptions";
import Opportunities from "../../components/OpportunitiesSection";
import TrainingAndCertification from "../../components/TrainingAndCertification";
import AppSolutions from "../../components/AppSolutions";
import ModerateBox from "../../components/ModerateContext/ModerateBox";
import FactsAboutUsSection from "../../components/FactsAboutUs";
import JobBenefitsSection from "../../components/JobBenefitsSection/index";
import BenefitsSection from "../../components/BenifitsSection/index";
import { payload } from "../../Utils/Text";

const ModerateSections = () => {
  return (
    <Grid container>
      {/* <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Available Sections/Components
        </Typography>
      </Grid> */}
      {/* <Grid
        container
        justify="flex-start"
        alignContent="center"
        alignItems="center"
        spacing={2}
      >
        
       
     
        
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <JobBenefitsSection />
        </Grid>
       
      {/* </Grid> */}
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Manage Sections
      </Typography>
      <ModerateBox payload={payload} />
    </Grid>
  );
};

export default ModerateSections;
