/* eslint-disable prettier/prettier */
import React from 'react';
import { GrOverview } from 'react-icons/gr';
import { Button } from '@mui/material';

export default function ViewIcon() {
  return (
    <Button
      variant="outlined"
      className={`italic text-blue-600 hover:text-violet-600 flex gap-3 cursor-pointer float-right`}
    >
      View
    </Button>
  );
}
