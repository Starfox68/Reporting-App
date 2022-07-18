import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import TextField from "@mui/material/TextField";
import { addDays } from "date-fns";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";

export default function SummaryPage() {
  const [dateInfo, setDateInfo] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [emailaddr, setEmailaddr] = useState("");


  const sendValue = (event) => {
    const startArray = String(dateInfo[0].startDate).split(" ");
    const endArray = String(dateInfo[0].endDate).split(" ");

    const obj = {
      startMonth: startArray[1],
      endMonth: endArray[1],
      startDay: startArray[2],
      endDay: endArray[2],
      startYear: startArray[3],
      endYear: endArray[3],
      email: emailaddr
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("http://localhost:3001/check-data", requestOptions).then(function (
    // fetch("http://localhost:3001/send-email", requestOptions).then(function (
      response
    ) {
      console.log(response);
      return response.json();
    });
    event.preventDefault();
  };

  const onEmailChange = (e) => {
    setEmailaddr(e.target.value);
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <Typography variant="h6" component="div" style={{ marginTop: "30px" }}>
          Select a date range and click send to generate an automated email
        </Typography>
        <Grid item style={{ marginTop: "30px" }}>
          <DateRangePicker
            onChange={(item) => setDateInfo([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateInfo}
            direction="horizontal"
          />
        </Grid>
        <Grid item>
        <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="Email"
            onChange={onEmailChange}
          />
          <Button style={{marginLeft: "10px", marginTop: "10px"}}
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
