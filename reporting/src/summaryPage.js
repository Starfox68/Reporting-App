import React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

export default function SummaryPage() {

  const [dateInfo, setDateInfo] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const sendValue = (event) => {

    const startArray = String(dateInfo[0].startDate).split(" ");
    const endArray = String(dateInfo[0].endDate).split(" ");

    const obj = {
      startMonth: startArray[1],
      endMonth: endArray[1],
      startDay: startArray[2],
      endDay: endArray[2],
      startYear: startArray[3],
      endYear: endArray[3]
    };


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
  };
    fetch('http://localhost:3000/check-data', requestOptions)
      .then(function(response) {
        console.log(response)
        return response.json();
      });
      event.preventDefault();
  }

  return (
    <div>
      <DateRangePicker
  onChange={item => setDateInfo([item.selection])}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={2}
  ranges={dateInfo}
  direction="horizontal"
/>
<br /><br /><br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={sendValue}
      >
        Send
      </Button>
    </div>
  );
}