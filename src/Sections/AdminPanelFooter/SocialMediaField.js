import React, { useState } from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import ListItems from "./ListItems";
const SocialMediaField = ({
  title,
  setInput,
  setFile,
  id,
  Title,
  link,
  setinput,
  linkArray,
  setLinkArray,
  addLink,
  edit,
  file,
}) => {
  const { labels, common } = useStyles();
  const [editing, setEditing] = useState(null);
  const [currentTodo, setCurrentTodo] = useState({
    title: "",
    link: "",
  });
  function submitEdits(id) {
    const updatedData = [...linkArray].map((data, index) => {
      if (index === id ) {
        data = currentTodo;
      }
      return data;
    });

    setLinkArray(updatedData);
    setEditing(null);
  }

  function submitImg(id) {
    const updatedData = [...linkArray].map((data, index) => {
      if (index === id ) {
        data = currentTodo;
        data.icon = file;
      }
      return data;
    });

    setLinkArray(updatedData);
    setEditing(null);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value });
  }

  function handleEditClick(
    id,
    number,
    country,
    officeType,
    address,
    title,
    link,
    icon
  ) {
    setEditing(id);
    setCurrentTodo({
      title: title,
      link: link,
      icon: icon
    });
  }
  return (
    <>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Link Title</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="linkTitle"
          value={title}
          onChange={(e) => setInput(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      {!edit ? (
        <>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Facebook Icon</InputLabel>
            <TextField
              variant="outlined"
              type="file"
              name="file"
              onChange={(e) => {
                setFile(e);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Instagram Icon</InputLabel>
            <TextField
              variant="outlined"
              type="file"
              name="file"
              onChange={(e) => {
                setFile(e);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Linkedin Icon</InputLabel>
            <TextField
              variant="outlined"
              type="file"
              name="file"
              onChange={(e) => {
                setFile(e);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid className={common} item lg={2} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Add Title</InputLabel>
            <form id={id}>
              <TextField
                placeholder="FaceBook"
                type="text"
                name="title"
                value={Title}
                variant="outlined"
                autoComplete="off"
                required
                onChange={(e) => setinput(e)}
                style={{ width: "100%" }}
              />
            </form>
          </Grid>
          <Grid className={common} item lg={2} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Social Media Links</InputLabel>
            <form id={id}>
              <TextField
                type="text"
                name="link"
                value={link}
                variant="outlined"
                autoComplete="off"
                required
                onChange={(e) => setinput(e)}
                style={{ width: "100%" }}
              />
            </form>
          </Grid>
        </>
      ) : (
        null
      )}
       <ListItems
            arr={linkArray}
            handleAddList={addLink}
            setArr={setLinkArray}
            submitEdits={submitEdits}
            handleEditInputChange={handleEditInputChange}
            handleEditClick={handleEditClick}
            editing={editing}
            firstField={currentTodo.title}
            secondField={currentTodo.link}
            firstName="title"
            secondName="link"
            setfbFile={setFile}
            edit={edit}
            file={file}
            setEditing={setEditing}
            submitImg={submitImg}
          />
    </>
  );
};

export default SocialMediaField;
