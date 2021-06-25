import { Grid } from "@material-ui/core";

import AddBanners from "./addBanners";

const BannersSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddBanners header="Manage Banner Section" />
      </Grid>
    </Grid>
  );
};

export default BannersSection;
