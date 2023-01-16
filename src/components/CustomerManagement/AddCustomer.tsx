import React from 'react';
import styles from '@/styles/Add.module.css';
import Switches from '@/utils/UIs/Switches';
import { FormGroup, Stack, TextField } from '@mui/material';

export default function AddAdmin() {
  return (
    <>
      <div className={`${styles.title}`}>
        <div className={`text-black`}>Customer detail</div>
      </div>
      <FormGroup className={`${styles.content} grid justify-around text-black`}>
        <Stack direction="row" spacing={2} className="flex justify-between">
          <TextField type="text" label="First name" />
          <TextField type="text" label="Last name" />
        </Stack>
        <TextField type="email" label="Email" className={`my-5`} />
        <Switches title="Active/Inactive"/>
      </FormGroup>
    </>
  );
}
