import React from "react";
import { Typography } from "@material-ui/core";
import ModerateBox from "../../components/ModerateContext/ModerateBox"
import {BoxData} from "../../Utils/Text"
const ModerateSections = () => {
 
  
  return (
    <>
      <Typography variant="h4" style={{textAlign: "center"}}>Manage Sections</Typography>
      <ModerateBox payload={BoxData}/>
    </>
  );
};

export default ModerateSections;