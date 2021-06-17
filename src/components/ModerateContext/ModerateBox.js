import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import useNavigate from "./useNavigate";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "flex-start",
    marginTop: "20px"
  },
  box: {
    height: 170,
    borderRadius: "5px",
    backgroundColor: "#3f51b5",
    margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    color: "white",
    textTransform: "none",
  },
});

const ModerateBox = ({ payload }) => {
  const { root, box, btn } = useStyles();
  const { handleId } = useNavigate();

  return (
    <>
      <Grid justify="center" container>
        <Grid className={root} item lg={12} md={12} sm={12} xs={12}>
          {payload.length ? (
            payload.map((data, id) => {
              return (
                <Grid key={id} className={box} item lg={2} md={4} sm={6} xs={6}>
                  <Button onClick={() => handleId(data.id)} className={btn}>
                    <Typography variant="h6">{data.page}</Typography>
                  </Button>
                </Grid>
              );
            })
          ) : (
            <p>Loading data...</p>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ModerateBox;
