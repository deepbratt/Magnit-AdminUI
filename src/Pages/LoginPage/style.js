import { makeStyles } from "@material-ui/core/styles";

const FormStyle = makeStyles((theme) => ({
   div:{height:"100vh"},
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
 logo:{
     width:"100px",
     height:"100px",
     textAlign:"center",
     border:"1px solid #3f51b5",
     borderRadius:"20%",
    backgroundColor:"#3f51b5",
    color:"white",
     display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
 },
 form:{
     width:"100%"
 },
 label:{
     textAlign:"left"
 },
 forget:{
     textDecoration:"underline",
    textAlign:"right", 
    margin:"1rem 0rem"
 },
 radio:{
    margin:"0rem 0rem 1rem 0rem"
 }
}));

export default FormStyle;