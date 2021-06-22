import React, { useState } from "react";
import useStyles from "../AdminPanelSliderSections/useStyles";
import { TextField, InputLabel, Grid,Typography,Divider } from "@material-ui/core";
import ListItems from "./ListItems";
const ContactField = ({
  title,
  setInput,
  countryInput,
  country,
  number,
  inputContact,
  array,
  add,
  setArray,
  edit,
  errors,
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
      <Grid container justify="center" style={{margin: "10px 0px 10px 0px"}} lg={12} xs={12} >
      <Typography variant="h6">
        Contact Us Data
      </Typography>
    </Grid>
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
        {!edit ? <p style={{ color: "red" }}>{errors.numberTitle}</p> : null}
      </Grid>
      {!edit ? (
        <>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Add State/Country</InputLabel>
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
          </Grid>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Add Number</InputLabel>
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
          </Grid>
        </>
      ) : null}
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
        setEditing={setEditing}
      />
      <Grid item xs={12} style={{marginBottom: "30px"}}>
          <Divider />
          </Grid>
    </>
  );
};

export default ContactField;
