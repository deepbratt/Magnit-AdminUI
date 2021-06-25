import { Grid } from "@material-ui/core";
import AddBenifts from "./addBenifits";

const BenifitsSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddBenifts header="Manage Benifits Section" />
      </Grid>
    </Grid>
  );
};

export default BenifitsSection;
