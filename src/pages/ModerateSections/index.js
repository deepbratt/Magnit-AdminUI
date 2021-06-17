import React from "react";
import { Typography } from "@material-ui/core";
import ModerateBox from "../../components/ModerateContext/ModerateBox"
import {BoxData} from "../../Utils/Text"
import HowItWorks from "../../Sections/HowItWorks";
import CaseStudies from "../../Sections/CaseStudies";
const ModerateSections = () => {
 
  
  return (
    <>
      <Typography variant="h4" style={{textAlign: "center"}}>Manage Sections</Typography>
      <ModerateBox payload={BoxData}/>
      <CaseStudies/>
    </>
  );
};

export default ModerateSections;