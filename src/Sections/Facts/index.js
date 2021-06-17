import {Grid} from "@material-ui/core";
import React, { useState } from "react";
import { withRouter } from "react-router";
import ContentTable from "../../components/Table";
import FactsForm from './FactsForm'

const Facts = () => {
  const [itemId, setItemId] = useState('')
  const data = [
    {
      id: "328uuec",
      title: "item1",
      query: "1223123",
    },
    {
      id: "384uudc",
      title: "item2",
    },
    {
      id: "38u23ec",
      title: "item3",
    },
  ];

  const deleteItem = (id) =>{
    console.log('delete this '+ id)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FactsForm itemId={itemId} clearItemId={()=>setItemId('')}/>
      </Grid>
      <Grid item xs={12}>
        <ContentTable dataArray={data} updateItem={setItemId} removeItem={deleteItem}/>
      </Grid>
    </Grid>
  );
};

export default withRouter(Facts);
