import React, { useState } from "react";
import {
  List,
  ListItem,
  TextField,
  InputLabel,
  Button,
  Grid,
} from "@material-ui/core";
import useStyles from "./useStyles";
import useFunctions from "./useFunctions";
const ListItems = ({ handleAddList, arr, list, input, setArr, id}) => {
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const {
    submitEdits,
    handleDeleteClick,
    handleEditClick,
    handleEditInputChange,
  } = useFunctions(setArr, setEditing, setEditingText, editingText, arr);

  const { labels, common, listItem } = useStyles();
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>List</InputLabel>
        <form id={id}>
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
        </form>
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
      <Grid className={common} item lg={10} md={5} sm={10} xs={12}>
        <List className={listItem}>
          {arr.map((data, index) => {
            return (
              <>
                {index === editing ? (
                  <>
                    <Grid
                      className={common}
                      item
                      lg={12}
                      md={5}
                      sm={10}
                      xs={12}
                    >
                      <InputLabel className={labels}>
                        Edit Your List Here!
                      </InputLabel>
                      <TextField
                        type="text"
                        name="edit"
                        value={editingText}
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%" }}
                        required
                        onChange={(e) => handleEditInputChange(e)}
                      />

                      <Button
                        style={{
                          background: "green",
                          margin: "18px 0px 0px 10px",
                        }}
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => submitEdits(index)}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <ListItem
                    style={{
                      background: "white",
                      margin: "10px 0px 10px 0px",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                    key={index}
                  >
                    {data}
                    <Button
                      style={{
                        background: "green",

                      }}
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEditClick(index, data)}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{
                        margin: "10px 0px 10px 20px",
                      }}
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(index)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                )}
              </>
            );
          })}
        </List>
      </Grid>
    </>
  );
};

export default ListItems;
