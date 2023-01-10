/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from '../styles/Login.module.css';

import Button from '@mui/material/Button';

import axios from 'axios';

export default function Login() {
  const [token, setToken]: any = useState();
  const [userName, setUserName] = useState();
  const [passWord, setPassWord] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const inputUserName = useRef<any>();
  const inputPass = useRef<any>();
  const router = useRouter();

  const changeUser = (e: any) => {
    setUserName(e.target.value);

    setIsDisabled(
      inputUserName?.current?.value == '' || inputPass?.current?.value == '',
    );
  };

  const changePassword = (e: any) => {
    setPassWord(e.target.value);
    setIsDisabled(
      inputUserName?.current?.value == '' || inputPass?.current?.value == '',
    );
  };

  const loginClick = async () => {
    await axios
      .post(
        'https://dev-api.digiex.asia/calobye-be-dev/api/auth/login',
        // '{\n  "login_id": "string",\n  "password_hash": "string",\n  "user_role": "SYSTEM_ADMIN",\n  "keep_login": true\n}',
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
        setToken(result == 200 ? 'Oke' : 'Incorrect password or account');
        result == 200 ? router.push('/') : null;
      })
      .catch((error: any) => error);
  };

  return (
    <div className={`${styles.login} text-black`}>
      <div className={`${styles.title}`}>CALOBYE</div>
      <form className={`${styles.form}`}>
        <input
          className={`${styles.input} rounded`}
          type="text"
          ref={inputUserName}
          name="username"
          onChange={changeUser}
          placeholder="UserName..."
        />{' '}
        <br />
        <span className={`text-red-500`}>{userName}</span>
        <br />
        <input
          className={`${styles.input} rounded`}
          type="password"
          ref={inputPass}
          name="pass"
          onChange={changePassword}
          placeholder="PassWord..."
        />
        <br />
        <span className={`text-red-500`}>{passWord}</span>
        <br />
        <Button
          disabled={isDisabled}
          className={`${styles.button} mt-16 rounded text-white`}
          onClick={loginClick}
          variant="contained"
        >
          Login
        </Button>
        <div className={`text-red-500`}>{token}</div>
      </form>
    </div>
  );
}
