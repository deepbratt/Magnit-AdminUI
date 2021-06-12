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

  function handleEditInputChange(e) {
    setEditingText(e.target.value);
  }

  function handleEditClick(id, todo) {
    setEditing(id);
    setEditingText(todo);
  }

  return (
    <>
      <Grid item xs={12}>
        <List className={list}>
          {arr.map((data, id) => (
            <div style={{ display: "flex" }} key={id}>
              {id === editing ? (
                <TextField
                  name="edit"
                  type="text"
                  variant="outlined"
                  value={editingText}
                  style={{ height: "10px", paddingRight: "20px" }}
                  required
                  onChange={(e) => handleEditInputChange(e)}
                />
              ) : (
                <ListItem style={{ margin: "20px 0px 20px 0px" }}>
                  {data}
                </ListItem>
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
                  onClick={() => handleEditClick(id, data)}
                >
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
