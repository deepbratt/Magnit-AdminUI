import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import TextFieldContext from "./TextFieldContext";
import useApi from "../../Utils/useApi";
import Toast from "../../components/Toast";
export default function EditData({ id, edit }) {
  const { updateData,responseAlert,open,setOpen,toastType} = useApi("http://3.138.190.235/v1/awards");

  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    clientName: "",
    link: "",
  });
  const { link, clientName } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append("link", link);
  {file && formData.append("image", file)}
  formData.append("clientName", clientName);

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const {data} = await axios.get(`http://3.138.190.235/v1/awards/${id}`);
    setData(data.data.result);
    setFile(data.data.result.image)
  };

  
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
            link={link}
            inputChange={inputChange}
            setFile={setFile}
            edit={edit}
          />
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              type="submit"
              onClick={() => {
                updateData(id, formData);
                setTimeout(() => {
                  edit(false);
                }, 3000);
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
