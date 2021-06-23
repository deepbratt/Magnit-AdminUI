import React from "react";
import {
  List,
  ListItem,
  TextField,
  InputLabel,
  Button,
  Grid,
} from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";

const ListItems = ({
  handleAddList,
  arr,
  setArr,
  handleEditClick,
  handleEditInputChange,
  submitEdits,
  editing,
  firstField,
  secondField,
  firstName,
  secondName,
  setfbFile,
  edit,
  setEditing,
  submitImg
}) => {
  function handleDeleteClick(id) {
    setArr((prev) => {
      return prev.filter((array, index) => {
        return index !== id;
      });
    });
  }

  const { labels, common, listItem, box } = useStyles();

  return (
    <>
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
      <Grid className={common} item lg={7} md={5} sm={10} xs={12}>
        <List className={listItem}>
          {arr.map(
            (
              { country, number, title, link, icon, address, officeType },
              index
            ) => {
              return (
                <Grid className={common} item lg={12} md={5} sm={10} xs={12}>
                  <div className={box} key={index}>
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
                              name={firstName}
                              value={firstField}
                              variant="outlined"
                              autoComplete="off"
                              style={{ width: "100%" }}
                              required
                              onChange={(e) => handleEditInputChange(e)}
                            />
                            <TextField
                              type="text"
                              name={secondName}
                              value={secondField}
                              variant="outlined"
                              autoComplete="off"
                              style={{ width: "100%" }}
                              required
                              onChange={(e) => handleEditInputChange(e)}
                            />
                              {icon ? 
                              <TextField
                              variant="outlined"
                              type="file"
                              name="file"
                              onChange={(e) => {
                                setfbFile(e);
                              }}
                              style={{ width: "100%" }}
                            />
                            : 
                            null
                            }
                    

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
                            {icon ? 
                            <Button
                            style={{
                              background: "blue",
                              margin: "18px 0px 0px 10px",
                            }}
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => submitImg(index)}
                          >
                            Submit Icon
                          </Button> : null
                          }
                            <Button
                              style={{
                                margin: "18px 0px 0px 10px",
                              }}
                              size="small"
                              variant="contained"
                              color="secondary"
                              onClick={() => setEditing(false)}
                            >
                              Cancel
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
                            border: "solid 2px lightGrey",
                            background: "transparent"
                          }}
                          key={index}
                        >
                          <p>
                            {country} {number}
                          </p>
                          <p>
                            {link} {title}
                          </p>
                          <p>
                            {officeType} {address}
                          </p>
                          {icon ? <p>{icon.name}</p> : null}
                          <Button
                            style={{
                              background: "green",
                            }}
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              handleEditClick(
                                index,
                                number,
                                country,
                                officeType,
                                address,
                                title,
                                link,
                                icon
                              );
                            }}
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
                  </div>
                </Grid>
              );
            }
          )}
        </List>
      </Grid>
    </>
  );
};

export default ListItems;
