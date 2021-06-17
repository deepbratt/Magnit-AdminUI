import { Grid } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import ContentTable from "../../components/Table";
import SimpleForm from "../../components/SimpleForm/SimpleForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import useCaseStudies from "./useCaseStudies";
import Toast from "../../components/Toast";
import {createCaseStudies, updateCaseStudies, getOneCaseStudies} from "../../Utils/loginApi";

const CaseStudies = () => {
  const {itemId, setItemId, dataArray, setDataArray, isLoading, deleteItem, openToast, setOpenToast, toastType, responseMessage} = useCaseStudies()

  return (
    <Grid container spacing={2}>
      <LoadingSpinner open={isLoading}/>
      <Grid item xs={12}>
        <SimpleForm
          itemId={itemId}
          clearItemId={() => setItemId("")}
          dataArray={dataArray}
          updateDataArray={setDataArray}
          createApi={createCaseStudies}
          updateApi={updateCaseStudies}
          getItemApi={getOneCaseStudies}
        />
      </Grid>
      <Grid item xs={12}>
        <ContentTable
          dataArray={dataArray}
          updateItem={setItemId}
          removeItem={deleteItem}
        />
      </Grid>
      <Toast
          open={openToast}
          onClose={() => setOpenToast(false)}
          severity={toastType}
          message={responseMessage}
        />
    </Grid>
  );
};

export default withRouter(CaseStudies);
