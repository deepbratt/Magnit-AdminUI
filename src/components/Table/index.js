import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import useContentTable from "./useContentTable";
import { contentTableConstants } from "./constants";

const ContentTable = ({ dataArray, updateItem, removeItem, edit}) => {
  const { editItem, deleteItem } = useContentTable(updateItem, removeItem);

  if (dataArray.length < 1) {
    return (
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0.5",
          zIndex: -1,
        }}
      >
        <Typography variant="h3" color="textSecondary">
          {contentTableConstants.noResult}
        </Typography>
      </Grid>
    );
  }

  const handleEdit = (id) => {
    editItem(id);
    if (edit) {
      edit(true);
    } else {
      return null;
    }
  };
  return (
    <Grid container style={{ border: "2px solid grey" }}>
      <Grid
        container
        item
        xs={12}
        style={{ borderBottom: "1px solid grey", padding: "5px" }}
      >
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            {contentTableConstants.tableColumnHeadings.tableId}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">
            {contentTableConstants.tableColumnHeadings.tableTitle}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            {contentTableConstants.tableColumnHeadings.tableParams}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            {contentTableConstants.tableColumnHeadings.tableAction}
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
            padding: "5px",
          }}
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={3}>
            {item._id}
          </Grid>
          <Grid item xs={4}>
            {item.title}
          </Grid>
          <Grid item xs={3}>
            {item.query}
          </Grid>
          <Grid
            item
            container
            xs={2}
            justify="space-between"
            style={{ display: "flex" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(item._id)}
            >
              <CreateIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteItem(item._id)}
            >
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

ContentTable.defaultProps = {
  dataArray: [],
};

export default ContentTable;
