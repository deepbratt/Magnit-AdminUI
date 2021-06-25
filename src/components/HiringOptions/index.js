import { Grid } from "@material-ui/core";
import AddHiringOptions from "./addHiringOptions";

const HiringOptions = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddHiringOptions header="Manage Hiring Options Section" />
      </Grid>
    </Grid>
  );
};

export default HiringOptions;
