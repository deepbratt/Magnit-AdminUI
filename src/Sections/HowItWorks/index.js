import {Grid} from "@material-ui/core";
import React, { useState } from "react";
import { withRouter } from "react-router";
import ContentTable from "../../components/Table";
import api from "../../Utils/loginApi";
import HowWorkForm from './HowWorkForm'
import SimpleForm from "../../components/SimpleForm/SimpleForm";

const HowItWorks = () => {
  const [itemId, setItemId] = useState('')
  const [dataArray, setDataArray] = useState([])
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

  useState(()=>{
    api.getAllHowItWorks().then(response=>{
      setDataArray(response.data.data.data)
    })
  },[])

  const deleteItem = (id) =>{
    api.deleteHowItWorks(id).then(response=>{
      console.log(response)
      let arr = dataArray
      let newArr = arr.filter(item=>item._id!==id)
      setDataArray(newArr)
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SimpleForm itemId={itemId} clearItemId={()=>setItemId('')} createApi={api.createHowItWorks} updateApi={api.updateHowItWorks} getItemApi={api.getOneHowItWorks}/>
      </Grid>
      <Grid item xs={12}>
        <ContentTable dataArray={dataArray} updateItem={setItemId} removeItem={deleteItem}/>
      </Grid>
    </Grid>
  );
};

export default withRouter(HowItWorks);
