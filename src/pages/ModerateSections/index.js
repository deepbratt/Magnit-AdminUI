import { Typography, Grid } from "@material-ui/core";
import ModerateBox from "../../components/ModerateContext/ModerateBox";
import { payload } from "../../Utils/Text";
const ModerateSections = () => {
  return (
    <Grid container>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Manage Sections
      </Typography>
      <ModerateBox payload={payload} />
    </Grid>
  );
};

export default ModerateSections;
