import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function CustomForm() {
  const [request, setRequest] = useState("");
  const [effort, setEffort] = useState("");
  const [type, setType] = useState("");
  const [typestr, setTypestr] = useState("");
  const [role, setRole] = useState("");
  const [comments, setComments] = useState("");
  const [environment, setEnvironment] = useState("");

  const onRequestChange = (e) => {
    setRequest(e.target.value);
  };

  const onEffortChange = (e) => {
    setEffort(e.target.value);
  };

  var typedict = {
    0: "Low environment issue",
    1: "Application issue",
    2: "Reports",
    3: "Connection",
    4: "Smurf Alert",
    5: "Security",
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
    setTypestr(typedict[e.target.value]);
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
      type: typestr,
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
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
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
          <Box sx={{ minWidth: 210 }} style={{ float: "left" }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={onTypeChange}>
                <MenuItem value={0}>Low environment issue</MenuItem>
                <MenuItem value={1}>Application issue</MenuItem>
                <MenuItem value={2}>Reports</MenuItem>
                <MenuItem value={3}>Connection</MenuItem>
                <MenuItem value={4}>Smurf Alert</MenuItem>
                <MenuItem value={5}>Security</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
