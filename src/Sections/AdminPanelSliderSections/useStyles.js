import { makeStyles } from '@material-ui/core/styles';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});
const useStyles = makeStyles(() => ({
    heading:{
        textAlign: "center",
    },
    container: {
        display: "flex",
        justifyContent: "space-evenly",
        textAlign: "left",
        margin: "20px",
        flexFlow: "wrap"
      },
      list: {
        display: "flex",
        justifyContent: "space-evenly",
        color: "black",
        alignItems: "center",
        margin: "30px 0 30px 0px",
        flexDirection: "column",
      },
      labels: {
        marginBottom: "10px",
        font: "20px",
      },
      common:{
        margin: "10px 20px 0px 20px"
      },
      listItem:{
        display:"flex",
        margin: "0px 0px 10px 0px",
        flexFlow: "wrap",
        fontSize: "18px",
        color: "#3f51b5",
        [breakpoints.down("sm")]: {
          flexDirection: "column",
          textAlign: "center"
        },
      },
      table:{
        marginTop: "20px"
      },
      grid:{
        display: "flex",
        flexFlow: "wrap",
        justifyContent: "center"
      },
      btn:{
        background: "green",
        color: "white",
        "&:hover":{
          background: "green"
        }
      },
      box:{
        margin: "10px",
        border: "solid 1px rgb(118, 118, 118)",
        padding: "10px 20px",
        borderRadius: "10px",
        justifyContent: "center"
      }
  }));


  export default useStyles