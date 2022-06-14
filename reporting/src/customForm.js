import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function App() {
  const [request, setRequest] = useState('');
  const [effort, setEffort] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');
  const [comments, setComments] = useState('');

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

  const sendValue = () => {
    console.log({
      request: request,
      effort: effort,
      type: type,
      role: role,
      comments: comments
    });
  };

  return (
    <div>
      <TextField
        required
        id="outlined-required"
        label="Request"
        placeholder="Ex. P1 Alerts"
        onChange={onRequestChange}
      />

      <TextField
        required
        id="outlined-required"
        label="Effort"
        placeholder="Ex. P1 Alerts"
        onChange={onEffortChange}
      />

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