import React, { useState } from "react";
import useStyles from "../AdminPanelSliderSections/useStyles";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import ListItems from "./ListItems";
const ContactField = ({
  title,
  setInput,
  countryInput,
  country,
  number,
  inputContact,
  id,
  array,
  add,
  setArray,
  edit,
}) => {
  const { labels, common } = useStyles();
  const [editing, setEditing] = useState(null);
  const [currentTodo, setCurrentTodo] = useState({
    country: "",
    number: "",
  });
  function submitEdits(id) {
    const updatedData = [...array].map((data, index) => {
      if (index === id) {
        data = currentTodo;
      }
      return data;
    });
    setArray(updatedData);
    setEditing(null);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value });
  }

  function handleEditClick(id, number, country) {
    setEditing(id);
    setCurrentTodo({
      country: country,
      number: number,
    });
  }
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Number Title</InputLabel>
        <TextField
          variant="outlined"
          required
          type="text"
          name="numberTitle"
          value={title}
          onChange={(e) => setInput(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      {!edit ? (
        <>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Add State/Country</InputLabel>
            <form id={id}>
              <TextField
                placeholder="USA:"
                type="text"
                name="country"
                value={country}
                variant="outlined"
                autoComplete="off"
                required
                onChange={(e) => countryInput(e)}
                style={{ width: "100%" }}
              />
            </form>
          </Grid>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Add Number</InputLabel>
            <form id={id}>
              <TextField
                placeholder="+9560446593023"
                type="text"
                name="number"
                value={number}
                variant="outlined"
                autoComplete="off"
                required
                onChange={(e) => inputContact(e)}
                style={{ width: "100%" }}
              />
            </form>
          </Grid>
        </>
      ) : (
        null
      )}
        <ListItems
            arr={array}
            handleAddList={add}
            setArr={setArray}
            submitEdits={submitEdits}
            handleEditInputChange={handleEditInputChange}
            handleEditClick={handleEditClick}
            editing={editing}
            firstField={currentTodo.country}
            secondField={currentTodo.number}
            firstName="country"
            secondName="number"
            edit={edit}
          />
    </>
  );
};

export default ContactField;
