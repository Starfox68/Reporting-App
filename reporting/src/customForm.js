import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";

export default function CustomForm() {
  const [request, setRequest] = useState("");
  const [effort, setEffort] = useState("");
  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const [comments, setComments] = useState("");
  const [environment, setEnvironment] = useState("");

  const onRequestChange = (e) => {
    setRequest(e.target.value);
  };

  const onEffortChange = (e) => {
    setEffort(e.target.value);
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const onEnvChange = (e) => {
    setEnvironment(e.target.value);
  };

  const sendValue = (event) => {
    const obj = {
      request: request,
      effort: effort,
      type: type,
      environment: environment,
      role: role,
      comments: comments,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("http://localhost:3001/store-data", requestOptions).then(function (
      response
    ) {
      console.log(response);
      return response.json();
    });
    event.preventDefault();
  };

  return (
    <div>
      <Grid container alignItems="center" justify="center" direction="column">
        <Typography variant="h6" component="div" style={{ marginTop: "30px" }}>
          Click Send to complete the form
        </Typography>
        <Grid item style={{ marginTop: "30px" }}>
          <TextField
            required
            id="outlined-required"
            label="Request"
            placeholder="Ex. P1 Alerts"
            onChange={onRequestChange}
          />
          <TextField
            required
            type={"number"}
            id="outlined-required"
            label="Effort"
            placeholder="Ex. P1 Alerts"
            onChange={onEffortChange}
          />
        </Grid>
        <Grid item style={{ marginTop: "30px" }}>
          <TextField
            required
            id="outlined-required"
            label="Type"
            placeholder="Ex. P1 Alerts"
            onChange={onTypeChange}
          />

          <TextField
            required
            id="outlined-required"
            label="Environment"
            placeholder="Ex. P1 Alerts"
            onChange={onEnvChange}
          />
        </Grid>

        <Grid item style={{ marginTop: "30px" }}>
          <TextField
            required
            id="outlined-required"
            label="Role"
            placeholder="Ex. P1 Alerts"
            onChange={onRoleChange}
          />

          <TextField
            required
            id="outlined-required"
            label="Comments"
            placeholder="Ex. P1 Alerts"
            onChange={onCommentsChange}
          />
        </Grid>
        <Grid item style={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={sendValue}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
