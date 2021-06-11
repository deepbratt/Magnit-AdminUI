import React from "react";
import {
  List,
  ListItem,
  TextField,
  InputLabel,
  Button,
  Grid,
} from "@material-ui/core";
import useStyles from "./useStyles";
const ListItems = ({ handleAddList, arr, list, input }) => {
  const { labels, common, listItem } = useStyles();
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>List</InputLabel>
        <TextField
          type="text"
          name="list"
          value={list}
          variant="outlined"
          autoComplete="off"
          required
          onChange={(e) => input(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <Button
          style={{ marginTop: "40px" }}
          variant="contained"
          color="primary"
          onClick={handleAddList}
        >
          Add List
        </Button>
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <List className={listItem}>
          {arr.map((data, index) => {
            return (
              <ListItem
                style={{ background: "white", margin: "10px 0px 10px 0px" }}
                key={index}
              >
                {data}
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </>
  );
};

export default ListItems;
