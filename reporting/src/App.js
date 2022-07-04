import './App.css';
// import React from "react";
import CustomForm from './customForm';
import SummaryPage from './summaryPage';
import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {

  const [page, setPage] = useState(0);

  return (
    <div className="App">
    {/* <CustomForm /> */}
    {/* <SummaryPage /> */}
    </div>
  );
}

export default App;
