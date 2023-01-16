import {  FormControl, 
          Box, 
          MenuItem, 
          TextField, 
          FormGroup, 
          Input } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import styles from '@/styles/Add.module.css';
import Switches from '@/utils/UIs/Switches';

export default function AddContent() {
  const [contentType, setContentType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setContentType(event.target.value as string);
  };
  return (

    <div className="text-black px-10">
      <div className={`${styles.title}`}>
        <div className={`text-black`}>Category detail</div>
      </div>

      <FormGroup className={`my-5`}>
        <label>Title name<span className='text-red'>*</span></label>
        <Input className="w-9/12" type="text" placeholder="Category name" />
      </FormGroup>

      <FormGroup className={`my-5`}>
        <label>Content type</label>
        <Box className="py-5" sx={{ width: 200, minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              id="demo-simple-select"
              value={contentType}
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value={10}>NEWS</MenuItem>
              <MenuItem value={20}>FAQ</MenuItem>
              <MenuItem value={30}>KTM</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 200,
            maxWidth: '100%',
          }}
        >
          <TextField variant='standard' fullWidth id="fullWidth" />
        </Box>
      </FormGroup>

      <div>
        <label>Short descripti</label>
        <br />
        <textarea className="text-white" rows={3} cols={50}></textarea>
      </div>

      <Switches title="Publish/Unpublish"/>
    </div>
  );
}
