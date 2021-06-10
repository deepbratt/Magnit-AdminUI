import { Button, Grid, TextField } from "@material-ui/core";
import React, { useReducer } from "react";
import { withRouter } from "react-router";
import ContentTable from "../../components/Table";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Facts = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value:
        event.target.name === "image"
          ? URL.createObjectURL(event.target.files[0])
          : event.target.value,
    });
  };
  const data = [
    {
      id: "328uuec",
      title: "item1",
      query: "1223123",
    },
    {
      id: "384uudc",
      title: "item2",
    },
    {
      id: "38u23ec",
      title: "item3",
    },
  ];

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="title"
                label="Title"
                type="text"
                variant="outlined"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="text"
                label="Text"
                type="text"
                variant="outlined"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              container
              justify="space-between"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs={6}>
                <Button variant="contained" component="label">
                  Upload Icon
                  <input
                    name="image"
                    type="file"
                    hidden
                    onChange={handleChange}
                  />
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ display: "flex" }}
                container
                justify="center"
              >
                <div>
                  <img src={formData.image} height="auto" width="100px" />
                </div>
              </Grid>
            </Grid>
            <Grid item xs={6} container spacing={2}>
              <Grid item xs={6} container justify="flex-end">
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary">
                  Discard
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        <ContentTable dataArray={data} />
      </Grid>
    </Grid>
  );
};

export default withRouter(Facts);
