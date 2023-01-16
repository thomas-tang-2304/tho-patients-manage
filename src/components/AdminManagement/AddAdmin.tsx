/* eslint-disable prettier/prettier */
import React from 'react';
import styles from '@/styles/Add.module.css';

import { FormGroup, Stack, TextField } from '@mui/material';
import Switches from '@/utils/UIs/Switches';

export default function AddAdmin() {
  return (
    <>
      <div className={`${styles.title}`}>
        <div className={`text-black`}>Admin detail</div>
      </div>
      <FormGroup className={`${styles.content} grid justify-around text-black`}>
        <Stack direction="row" className={`flex justify-between`} spacing={2}>
          <TextField type="text" label="First name" />
          <TextField type="text" label="Last name" />
        </Stack>
        <TextField type="email" label="Email" className={`my-5`} />
        <Switches title="Active/Inactive" />
      </FormGroup>
    </>
  );
}
