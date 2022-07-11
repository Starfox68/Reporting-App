import "./App.css";
// import React from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <Typography variant="h6" component="div">
        Select Form to enter a new issue or
      </Typography>
      <Typography variant="h5" component="div">
        OR
      </Typography>
      <Typography variant="h6" component="div">
        Select Summary to generate reports
      </Typography>

      <Link style={{ textDecoration: "none" }} to="/form">
        <Button
          variant="contained"
          style={{
            maxWidth: "80px",
            maxHeight: "60px",
            minWidth: "80px",
            minHeight: "60px",
            marginTop: "80px",
          }}
        >
          Form
        </Button>
      </Link>

      <Link style={{ textDecoration: "none" }} to="/summary">
        <Button
          variant="contained"
          style={{
            maxWidth: "80px",
            maxHeight: "60px",
            minWidth: "80px",
            minHeight: "60px",
            marginLeft: "40px",
            marginTop: "80px",
          }}
        >
          Summary
        </Button>
      </Link>
    </div>
  );
}

export default App;
