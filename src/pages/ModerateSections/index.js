import { Typography, Grid } from "@material-ui/core";
import ModerateBox from "../../components/ModerateContext/ModerateBox";
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
  const history = useHistory();

  return (
    <Grid container>
      <Grid>
        {sectionsRoutes.map((section, index) => (
          <Grid
            key={index + "sections-routes"}
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
          >
            <NewItemButton
              name={section.name}
              handleClick={() => history.push(section.link)}
            />
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
