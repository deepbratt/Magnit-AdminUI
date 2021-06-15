import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TextFieldContext from "./TextFieldContext";
import useApi from "../../Utils/useApi";
export default function EditData({ id, edit }) {
  const { updateData, isPending } = useApi("http://3.138.190.235/v1/awards");

  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    clientName: "",
    link: "",
  });
  const { title, link, clientName } = data;
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append("link", link);
  formData.append("image", file);
  formData.append("clientName", clientName);

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const result = await axios.get(`http://3.138.190.235/v1/awards/${id}`);
    setData(result.data.data.data);
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
                }, 1000);
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
          {isPending ? (
            <Alert severity="info">Status: pending!</Alert>
          ) : (
            <Alert severity="success">Status: updated successfully!</Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
