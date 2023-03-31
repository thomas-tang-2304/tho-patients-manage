import {
  FormControl,
  Box,
  MenuItem,
  TextField,
  FormGroup,
  Input,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import styles from '@/styles/Add.module.css';
import Switches from '@/utils/UIs/Switches';

export default function AddContent() {
  const [contentType, setContentType] = React.useState('');
  const [data, setData] = React.useState({
    titleName: "",
    contentType: "",
    shortDescripti:"",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setContentType(event.target.value as string);
  };

  return (
    <div className="px-10 text-black">
      <div className={`${styles.title}`}>
        <div className={`text-black`}>Category detail</div>
      </div>

      <FormGroup className={`my-5`}>
        <label>Title name<span className='text-red-700'>*</span></label>
        <Input value={data.titleName} className="w-9/12" type="text" placeholder="Category name" />
      </FormGroup>

      <FormGroup className={`my-5`}>
        <label>Content type</label>
        <Box className="py-5" sx={{ width: 200, minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              id="demo-simple-select"
              value={data.contentType}
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value={10}>NEWS</MenuItem>
              <MenuItem value={20}>FAQ</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 200,
            maxWidth: '100%',
          }}
        >
          <TextField variant="standard" fullWidth id="fullWidth" />
        </Box>
      </FormGroup>

      <div>
        <label>Short descripti</label><br />
        <textarea id='shortDescripti' value={data.shortDescripti} className="text-white" rows={3} cols={50}></textarea>
      </div>

      <Switches title="Publish/Unpublish" />
    </div>
  );
}
