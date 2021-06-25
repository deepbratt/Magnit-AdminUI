import { Grid } from "@material-ui/core";
import AddAppSolutions from "./addAppSolutions";

const AppSolutions = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddAppSolutions header="Manage App Solutions" />
      </Grid>
    </Grid>
  );
};

export default AppSolutions;
