import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
export default function EditData({ id, edit }) {
  const { handlePutMethod, responseAlert,open,setOpen,toastType,headers } = useApi("https://api.themagnit.com/v1/Reviews");

  const [file, setFile] = useState(null);
  const [cFile, setCFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({
    clientName: "",
    projectName: "",
    projectType: "",
    review: "",
    rating: 0,
  });
  const { clientName, projectName, projectType, review, rating } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const result = await axios.get(`https://api.themagnit.com/v1/Reviews/${id}`, {headers});
    setData(result.data.data.result);
    setFile(result.data.data.result.image)
    setDate(result.data.data.result.Date)
    console.log(result)
  };

  const formData = new FormData();
  formData.append("clientName", clientName);
  formData.append("projectName", projectName);
  formData.append("projectType", projectType);
  formData.append("review", review);
  {file && formData.append("image", file)}
  {cFile && formData.append("clientImage", cFile)}
  formData.append("rating", rating);
 
    
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }; 

  
  return (
    <div>
      <Grid justify="center" container>
        <Grid
          style={{
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "center",
            marginTop: "13px",
          }}
          lg={12}
          item
          xs={12}
        >
          <TextFieldContext
             clientName={clientName}
             projectName={projectName}
             projectType={projectType}
             review={review}
             rating={rating}
             inputChange={inputChange}
             setFile={setFile}
             edit={edit}
             date={date}
             setDate={setDate}
             setCFile={setCFile}
          />
          <Grid item>
            <Button
              type="submit"
              onClick={() => {
                handlePutMethod(id, formData);
                setTimeout(() => {
                  edit(false);
                }, 4000);
              }}
              variant="contained"
              color="primary"
            >
              Update Data
            </Button>
            <Button
              type="submit"
              onClick={() => edit(false)}
              variant="contained"
              color="secondary"
              style={{ marginLeft: "15px" }}
            >
              Cancel Edit
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ marginTop: "30px" }}
        >
         {responseAlert && (
          <Toast
            open={open}
            severity={toastType}
            message={responseAlert.message}
            onClose={handleToastClose}
          />
        )}
        </Grid>
      </Grid>
    </div>
  );
}
