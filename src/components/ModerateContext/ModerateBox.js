import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, CardContent, Card } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "flex-start",
    marginTop: "20px",
  },
  box: {
    height: 170,
    borderRadius: "5px",
    backgroundColor: "white",
    margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .25s linear",
    "&:hover": {
      boxShadow: "0px 2px 15px 5px rgba(0, 0, 0, 0.2)",
      transition: "all .25s linear",
      backgroundColor: "rgba(0, 0, 0, 0.06)",
    },
  },
});

const ModerateBox = ({payload}) => {
  const { root, box } = useStyles();

  return (
    <>
      <Grid justify="center" container>
        <Grid className={root} item lg={12} md={12} sm={12} xs={12}>
          {payload.map((data, index) => {
            return (
              <Grid key={index} item lg={2} md={4} sm={6} xs={6}>
                <NavLink
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    color: "black",
                  }}
                  to={data.path}
                  key={`route-${index}}`}
                >
                  <Card className={box}>
                    <CardContent>
                      <Typography variant="h6">{data.text}</Typography>
                    </CardContent>
                  </Card>
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default ModerateBox;
