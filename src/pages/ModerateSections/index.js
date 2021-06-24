import { Typography, Grid } from "@material-ui/core";
import ServicesSection from "../../components/ServicesSection";
import OurWorkSection from "../../components/OurWorkSection";
import BannersSection from "../../components/Banners";
import HiringOptions from "../../components/HiringOptions";
import Opportunities from "../../components/OpportunitiesSection";
import TrainingAndCertification from "../../components/TrainingAndCertification";
import AppSolutions from "../../components/AppSolutions";
import ModerateBox from "../../components/ModerateContext/ModerateBox";
import JobBenefitsSection from "../../components/JobBenefitsSection/index";
import BenefitsSection from "../../components/BenifitsSection/index";
import { payload } from "../../Utils/Text";
import NewItemButton from "../../components/NewItemButton";
import { useHistory } from "react-router-dom";
const ModerateSections = () => {
  const sectionsRoutes = [
    {
      link: "/moderate-sections/case-studies",
      name: "Case Studies",
    },
    {
      link: "/moderate-sections/how-it-works",
      name: "How It Works",
    },
    {
      link: "/moderate-sections/faqs",
      name: "FAQs",
    },
  ];
  const history = useHistory()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Available Sections/Components
        </Typography>
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ServicesSection />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <OurWorkSection />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <BannersSection />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <HiringOptions />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Opportunities />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TrainingAndCertification />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <AppSolutions />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <JobBenefitsSection />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <BenefitsSection />
        </Grid>
        {sectionsRoutes.map((section, index) => (
          <Grid key={index+"sections-routes"} item xs={12} sm={6} md={3} lg={2}>
            <NewItemButton name={section.name} handleClick={() => history.push(section.link)} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Manage Sections
      </Typography>
      <ModerateBox payload={payload} />
    </Grid>
  );
};

export default ModerateSections;
