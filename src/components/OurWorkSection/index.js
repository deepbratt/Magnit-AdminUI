import { Grid } from "@material-ui/core";
import AddOurWork from "./addOurWork";

const OurWorkSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddOurWork />
      </Grid>
    </Grid>
  );
};

export default OurWorkSection;
