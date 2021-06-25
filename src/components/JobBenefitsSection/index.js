import { Grid } from "@material-ui/core";
import AddJobBenifits from "../JobBenefitsSection/addJobBenifits";
const JobBenefitsSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddJobBenifits header="Manage Job Benefits Section" />
      </Grid>
    </Grid>
  );
};

export default JobBenefitsSection;
