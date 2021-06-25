import { Grid } from "@material-ui/core";
import AddOpportunities from "./addOpportunities";

const Opportunities = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddOpportunities header="Manage Opportunities Section" />
      </Grid>
    </Grid>
  );
};

export default Opportunities;
