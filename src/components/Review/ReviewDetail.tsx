import React from 'react';
import styles from '@/styles/Add.module.css';
import {
  Switch,
  SwitchProps,
  styled,
  Rating,
  FormControlLabel,
} from '@mui/material';

export default function AddAdmin() {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor:
            theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <div className={`${styles.main} text-black`}>
      <div className={`${styles.title}`}>Review detail</div>
      <FormControlLabel
        className={`font-bold text-black`}
        labelPlacement="start"
        label="Approve"
        control={<IOSSwitch defaultChecked sx={{ m: 1 }} />}
      />
      <p>
        <b>Rating</b> <Rating name="read-only" defaultValue={5} readOnly />
      </p>
      <p>
        <b>Fullname</b> John Doe
      </p>
      <p>
        <b>Title name</b> Sản phẩm dùng tốt, giao hàng nhanh
      </p>
      <p>
        <b>Review date</b> {new Date().toISOString()}
      </p>
      <p>
        <b>Comment</b>
      </p>
      <p>Đây là commet review sản phẩm tốt và tiện ích</p>
      <img src="" alt="" />
    </div>
  );
}
