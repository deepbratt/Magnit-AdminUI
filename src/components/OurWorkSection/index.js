import { Grid } from "@material-ui/core";
import AddOurWork from "./addOurWork";

const OurWorkSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddOurWork header="Manage Our Works Section"/>
      </Grid>
    </Grid>
  );
};

export default OurWorkSection;
