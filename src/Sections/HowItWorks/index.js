import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { withRouter } from "react-router";
import ContentTable from "../../components/Table";
import api from "../../Utils/loginApi";
import SimpleForm from "../../components/SimpleForm/SimpleForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import useHowItWorks from "./useHowItWorks";

const HowItWorks = () => {
  const {itemId, setItemId, dataArray, setDataArray, isLoading, deleteItem} = useHowItWorks()

  return (
    <Grid container spacing={2}>
      <LoadingSpinner open={isLoading}/>
      <Grid item xs={12}>
        <SimpleForm
          itemId={itemId}
          clearItemId={() => setItemId("")}
          dataArray={dataArray}
          updateDataArray={setDataArray}
          createApi={api.createHowItWorks}
          updateApi={api.updateHowItWorks}
          getItemApi={api.getOneHowItWorks}
        />
      </Grid>
      <Grid item xs={12}>
        <ContentTable
          dataArray={[]}
          updateItem={setItemId}
          removeItem={deleteItem}
        />
      </Grid>
    </Grid>
  );
};

export default withRouter(HowItWorks);
