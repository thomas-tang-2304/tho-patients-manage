import React, {useState} from 'react';
import styles from '@/styles/Add.module.css';
import Switches from '@/utils/UIs/Switches';
import Cookies from 'universal-cookie';
import Modal from '@/utils/UIs/Modal';
import { FormGroup, Stack, TextField } from '@mui/material';

export default function AddAdmin() {

  const axios = require('axios');
  const cookies = new Cookies();

  const [token, setToken] = useState(cookies.get('account_token'));
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <div className={`${styles.title}`}>
        <div className={`text-black`}>Customer detail</div>
      </div>
      <FormGroup className={`${styles.content} grid justify-around text-black`}>
        <Stack direction="row" spacing={2} className="flex justify-between">
          <TextField type="text" label="First name" name='firstname'/>
          <TextField type="text" label="Last name" name='lastname'/>
        </Stack>
        <TextField type="email" label="Email" className={`my-5`} name='email'/>
        <Switches title="Active/Inactive"/>
      </FormGroup>
    </>
  );
}
