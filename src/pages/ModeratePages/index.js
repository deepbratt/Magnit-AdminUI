import { Typography, Grid } from "@material-ui/core";
import AddNewPage from "./addNewPage";

const ModeratePages = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Pages
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddNewPage />
      </Grid>
    </Grid>
  );
};

export default ModeratePages;
