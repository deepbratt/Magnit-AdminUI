import { Grid } from "@material-ui/core";
import AddTrainingAndCertification from "./addTrainingAndCertification";

const TrainingAndCertification = () => {
  
  return (
    <Grid container>
      <Grid item xs={12}>
        <AddTrainingAndCertification header="Manage Training And Certification Section" />
      </Grid>
    </Grid>
  );
};

export default TrainingAndCertification;
