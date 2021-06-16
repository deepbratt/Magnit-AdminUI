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
        margin: "30px 0 30px 0",
        [breakpoints.down("sm")]: {
            flexDirection: "column"
          },
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
        marginTop: "20px",
        "&:hover":{
          background: "green"
        }
      }
  }));


  export default useStyles