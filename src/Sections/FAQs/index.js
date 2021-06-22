import { Grid } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import ContentTable from "../../components/Table";
// import SimpleForm from "../../components/SimpleForm/SimpleForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import useFAQs from "./useFAQs";
import Toast from "../../components/Toast";
import {createFAQs, updateFAQs, getOneFAQs} from "../../Utils/loginApi";
import { apiFieldNames } from "../../Utils/Text";
import OnlyTextForm from "../../components/OnlyTextForm/OnlyTextForm";

const FAQs = () => {
  const {itemId, setItemId, dataArray, setDataArray, isLoading, deleteItem, openToast, setOpenToast, toastType, responseMessage} = useFAQs()

  return (
    <Grid container spacing={2}>
      <LoadingSpinner open={isLoading}/>
      <Grid item xs={12}>
        <OnlyTextForm
          itemId={itemId}
          clearItemId={() => setItemId("")}
          dataArray={dataArray}
          updateDataArray={setDataArray}
          createApi={createFAQs}
          updateApi={updateFAQs}
          getItemApi={getOneFAQs}
          apiFieldNames={apiFieldNames.faq}
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

export default withRouter(FAQs);
