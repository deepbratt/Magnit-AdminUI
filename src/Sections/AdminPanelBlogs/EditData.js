import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
export default function EditData({ id, edit }) {
  const { updateData, responseAlert,open,setOpen,toastType } = useApi("http://3.138.190.235/v1/blogs");

  const [date, setDate] = useState(new Date());
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    link: "",
    text: "",
    buttonLabel: "",
    views: 0,
  });
  const { title, link, text, buttonLabel, views } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const result = await axios.get(`http://3.138.190.235/v1/blogs/${id}`);
    setData(result.data.data.result);
    setFile(result.data.data.result.image)
  };

  const formData = new FormData()
  formData.append("views", views)
  {file && formData.append("image", file)}
  formData.append("title", title)
  formData.append("text", text)
  formData.append("link", link)
  formData.append("buttonLabel", buttonLabel)
 
    
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
            title={title}
            link={link}
            buttonLabel={buttonLabel}
            text={text}
            views={views}
            inputChange={inputChange}
            setFile={setFile}
            setDate={setDate}
            date={date}
            edit={edit}
          />
          <Grid item>
            <Button
              type="submit"
              onClick={() => {
                updateData(id, formData);
                setTimeout(() => {
                  edit(false);
                }, 2000);
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
