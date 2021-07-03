import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import Toast from "../../components/Toast";
import TextFieldContext from "./TextFieldContext";
import useApi from "../../Utils/useApi";
export default function EditData({ id, edit }) {
  const { handleEdit,responseAlert,open,setOpen,toastType,headers} = useApi();

  const [data, setData] = useState({
    text: "",
    link: "",
    buttonLabel: "",
  });
  const { link, text, buttonLabel } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const result = await axios.get(`http://api.themagnit.com/v1/teams/${id}`, {headers});
    setData(result.data.data.result);
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
            link={link}
            buttonLabel={buttonLabel}
            text={text}
            inputChange={inputChange}
            edit={edit}
          />
          <Grid item lg={12} style={{display: "flex",justifyContent: "center", marginTop: "20px"}}>
            <Button
              type="submit"
              onClick={() => {
                handleEdit(text, link, buttonLabel, id);
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
