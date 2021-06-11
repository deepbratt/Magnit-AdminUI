import React, { useState } from "react";
import { Grid, Button, List, ListItem, TextField } from "@material-ui/core";
import useStyles from "./useStyles";
const EditList = ({ arr, setArr }) => {
  const { list } = useStyles();
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  function submitEdits(id) {
    const updatedData = [...arr].map((text, index) => {
      if (index === id) {
        text = editingText;
      }
      return text;
    });
    setArr(updatedData);
    setEditing(null);
  }
  return (
    <>
      <Grid item xs={12}>
        <List className={list}>
          {arr.map((data, id) => (
            <div style={{ display: "flex" }} key={id}>
              {id === editing ? (
                <TextField
                  type="text"
                  variant="outlined"
                  style={{ height: "10px", paddingRight: "20px" }}
                  required
                  value={id === editing && editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <ListItem
                style={{margin: "20px 0px 20px 0px"}}>{data}</ListItem>
              )}
              {id === editing ? (
                <Button
                  variant="contained"
                  style={{
                    margin: "10px 0px 20px 0px",
                    color: "white",
                    background: "green",
                  }}
                  size="small"
                  onClick={() => submitEdits(id)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                style={{
                  margin: "20px 0px 20px 0px",
                }}
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => setEditing(id)}>
                  Edit
                </Button>
              )}
            </div>
          ))}
        </List>
      </Grid>
    </>
  );
};

export default EditList;
