import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from '@/styles/Login.module.css';
import {
  Button,
  InputAdornment,
  FormGroup,
  IconButton,
  Input,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Notify from './notifyPopup';

import Cookies from 'universal-cookie';
import axios from 'axios';
import hashPass from 'md5';

const cookies = new Cookies();

export default function Login() {
  const [cookie, setCookie] = useState();
  const [userName, setUserName] = useState();
  const [passWord, setPassWord] = useState<string>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [notifyModal, setNotifyModal] = React.useState<any>(null);

  const inputUserName = useRef<any>();
  const inputPass = useRef<any>();
  const router = useRouter();

  const changeUser = (e: any) => {
    setUserName(e.target.value);

    setIsDisabled(
      inputUserName?.current?.value == '' || inputPass?.current?.value == '',
    );
  };

  const changePassWord = (e: any) => {
    setPassWord(hashPass(e.target.value));

    setIsDisabled(
      inputUserName?.current?.value == '' || inputPass?.current?.value == '',
    );
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const loginClick = async () => {
    await axios
      .post(
        'https://dev-api.digiex.asia/calobye-be-dev/api/auth/login',
        {
          login_id: userName,
          password_hash: passWord,
          user_role: 'SYSTEM_ADMIN',
          keep_login: true,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res: any) => {
        const result = res?.data?.status;

        cookies.set('account_token', res.data.data.id, {
          secure: process.env.NODE_ENV !== 'development',
          maxAge: res.data.data.expiry_date,
          sameSite: 'strict',
          path: '/',
        });

        setNotifyModal(
          result == 200 ? (
            <Notify title={'success'} state={'success'} />
          ) : (
            <Notify title={'Invalid user name and password'} state={'error'} />
          ),
        );

        result == 200
          ? setTimeout(() => {
              router.push('/');
            }, 2000)
          : null;
      })
      .catch((error: any) => error);
  };

  return (
    <>
      {notifyModal}
      <div className={`${styles.login} h-96 w-96 text-center text-black`}>
        <div className={`${styles.title} text-4xl h-14`}>CALOBYE</div>
        <FormGroup className="grid justify-around">
          <Input
            className="mb-5"
            type="text"
            ref={inputUserName}
            name="uname"
            onChange={changeUser}
            placeholder="UserName..."
          />
          <Input
            className="mt-5"
            type={showPassword ? 'text' : 'password'}
            ref={inputPass}
            onChange={changePassWord}
            placeholder="PassWord..."
            name="pass"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            disabled={isDisabled}
            className={`${styles.button} font-bold cursor-pointer mt-16 rounded text-white`}
            onClick={loginClick}
            variant="contained"
          >
            Login
          </Button>
        </FormGroup>
      </div>
    </>
  );
}
