import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, TextField, InputLabel } from "@material-ui/core";
import useApi from "../../Utils/useApi";
import useStyles from "../AdminPanelSliderSections/useStyles";
import Toast from "../../components/Toast";
export default function EditData({ id, edit }) {
  const { updateData, responseAlert,open,setOpen,toastType } = useApi("http://api.themagnit.com/v1workflows");
  const { common, labels } = useStyles();
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const result = await axios.get(`http://api.themagnit.com/v1workflows/${id}`);
    setFile(result.data.data.result.image);
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formData = new FormData();
  formData.append("image", file)

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
          <Grid
            className={common}
            style={{ marginBottom: "20px" }}
            item
            lg={12}
            md={5}
            sm={10}
            xs={12}
          >
            <InputLabel className={labels}>Image</InputLabel>
            <TextField
              variant="outlined"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item>
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
