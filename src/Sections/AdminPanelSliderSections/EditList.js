import React, { useState } from "react";
import { Grid, Button, List, ListItem, TextField } from "@material-ui/core";
import useStyles from "./useStyles";
import useFunctions from "./useFunctions";
const EditList = ({ arr, setArr }) => {
  const { list } = useStyles();
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const {
    submitEdits,
    handleDeleteClick,
    handleEditClick,
    handleEditInputChange,
    handleCancelClick,
  } = useFunctions(setArr, setEditing, setEditingText, editingText, arr);

  return (
    <>
      <Grid item xs={12}>
        <List className={list}>
          {arr.map((data, id) => (
            <div
              style={{
                display: "flex",
                margin: "10px",
                border: "solid 1px rgb(118, 118, 118)",
                width: "70%",
                padding: "10px 20px",
                borderRadius: "10px",
              }}
              key={id}
            >
              {id === editing ? (
                <TextField
                  name="edit"
                  type="text"
                  variant="outlined"
                  value={editingText}
                  style={{ height: "0px", width: "80%", padding: "0px" }}
                  required
                  onChange={(e) => handleEditInputChange(e)}
                />
              ) : (
                <ListItem
                  style={{
                    margin: "20px 10px 20px 0px",
                    border: "solid 2px lightGrey",
                  }}
                >
                  {data}
                </ListItem>
              )}
              {id === editing ? (
                <>
                  <Button
                    variant="contained"
                    style={{
                      margin: "20px 20px 20px",
                      color: "white",
                      background: "green",
                    }}
                    size="small"
                    onClick={() => submitEdits(id)}
                  >
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{
                      margin: "20px 0px 20px",
                    }}
                    size="small"
                    onClick={() => handleCancelClick(data)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{
                      margin: "20px 0px 20px 0px",
                      background: "green",
                    }}
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditClick(id, data)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      margin: "20px 0px 20px 10px",
                    }}
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(id, data)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          ))}
        </List>
      </Grid>
    </>
  );
};

export default EditList;
