import { Grid } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import ContentTable from "../../components/Table";
import SimpleForm from "../../components/SimpleForm/SimpleForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import useHowItWorks from "./useHowItWorks";
import Toast from "../../components/Toast";
import {createHowItWorks, updateHowItWorks, getOneHowItWorks} from "../../Utils/loginApi";
import {apiFieldNames} from '../../Utils/Text'

const HowItWorks = () => {
  const {itemId, setItemId, dataArray, setDataArray, isLoading, deleteItem, openToast, setOpenToast, toastType, responseMessage} = useHowItWorks()

  return (
    <Grid container spacing={2}>
      <LoadingSpinner open={isLoading}/>
      <Grid item xs={12}>
        <SimpleForm
          itemId={itemId}
          clearItemId={() => setItemId("")}
          dataArray={dataArray}
          updateDataArray={setDataArray}
          createApi={createHowItWorks}
          updateApi={updateHowItWorks}
          getItemApi={getOneHowItWorks}
          apiFieldNames={apiFieldNames.howItWorks}
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

export default withRouter(HowItWorks);
