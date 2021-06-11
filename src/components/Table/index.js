import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import useContentTable from "./useContentTable";

const ContentTable = ({dataArray,edit}) => {
    const {editItem, deleteItem} = useContentTable()
  return (
    <Grid container style={{ border: "2px solid grey" }}>
      <Grid container item xs={12} style={{ borderBottom: "1px solid grey", padding:"5px" }}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">ID</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Title</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Query Params</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            Actions
          </Typography>
        </Grid>
      </Grid>
      {dataArray.map((item, index) => (
        <Grid
          key={"tableContent" + index}
          container
          item
          xs={12}
          style={{
            background: index % 2 === 0 ? "lightblue" : "white",
            padding:"5px"
          }}
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={3}>
            {item.id}
          </Grid>
          <Grid item xs={4}>
            {item.title}
          </Grid>
          <Grid item xs={3}>
            {item.query}
          </Grid>
          <Grid item container xs={2} justify="space-between" style={{ display: "flex" }}>
            <Button variant="contained" color="primary" onClick={()=>{editItem(item.id)
            edit(true)
      }}><CreateIcon /></Button>
            <Button variant="contained" color="secondary" onClick={()=>deleteItem(item.id)}><DeleteIcon /></Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

ContentTable.defaultProps = {
    dataArray: [{}]
  };

export default ContentTable;
