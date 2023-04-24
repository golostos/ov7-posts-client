import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

export default function Finger() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="fingerprint" color="secondary">
        <Fingerprint />
      </IconButton>
      <IconButton aria-label="fingerprint" color="success">
        <Fingerprint />
      </IconButton>
      <IconButton aria-label="fingerprint" color="inherit">
        <Fingerprint />
      </IconButton>
      <IconButton aria-label="fingerprint" color="default">
        <Fingerprint />
      </IconButton>
      <IconButton aria-label="fingerprint" color="info">
        <Fingerprint />
      </IconButton>
    </Stack>
  );
}