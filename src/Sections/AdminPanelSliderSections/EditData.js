import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import EditList from "./EditList";
import TextFieldContext from "./TextFieldContext";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
export default function EditData({ id,edit}) {
  const { updateData,responseAlert,open,setOpen,toastType} = useApi("http://3.138.190.235/v1/sliders");

  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const [data, setData] = useState({
    title: "",
    buttonLabel: "",
    buttonLink: "",
  });
  const { title, buttonLabel, buttonLink } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formData = new FormData();
  
  {file && formData.append("backgroundImage", file);}
  formData.append("title", title);
  formData.append("items", array);
  formData.append("buttonLabel", buttonLabel);
  formData.append("buttonLink", buttonLink);

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const result = await axios.get(`http://3.138.190.235/v1/sliders/${id}`);
    setData(result.data.data.result);
    setArray(result.data.data.result.items);
    setFile(result.data.data.result.backgroundImage)
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
              buttonLabel={buttonLabel}
              inputChange={inputChange}
              buttonLink={buttonLink}
              setFile={setFile}
              file={file}
              edit={edit}
            />
            <EditList arr={array} setArr={setArray} />
            <Grid item>
              <Button
                type="submit"
                onClick={() => {
                  updateData(id, formData);
                  setTimeout(() => {
                    edit(true)
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
                style={{marginLeft: "15px"}}
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
