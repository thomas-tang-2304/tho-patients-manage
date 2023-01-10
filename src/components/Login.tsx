/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from '../styles/Login.module.css';
import Button from '@mui/material/Button';
<<<<<<< HEAD

=======
import Cookies  from 'universal-cookie';
>>>>>>> bb4cafab701cadaef4569b44db881da3ae8628b0
import axios from 'axios';

const cookies = new Cookies();

export default function Login() {
  const [token, setToken]: any = useState();
  const [cookie, setCookie] = useState();
  const [userName, setUserName] = useState();
  const [passWord, setPassWord] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const inputUserName = useRef<any>();
  const inputPass = useRef<any>();
  const router = useRouter();

  const changeUser = (e: any) => {
    setUserName(e.target.value);

<<<<<<< HEAD
    setIsDisabled(
      inputUserName?.current?.value == '' || inputPass?.current?.value == '',
    );
  };

  const changePassword = (e: any) => {
    setPassWord(e.target.value);
    setIsDisabled(
      inputUserName?.current?.value == '' || inputPass?.current?.value == '',
=======
  const valueUser = () => {
    setUserName(
      inputUserName.current.value == ''
        ? 'không UserName để trống !!!'
        : inputUserName.current.value
    );
    setPassWord(
      inputPass.current.value == '' 
        ? 'không PassWord để trống !!!'
        : hashPass(inputPass.current.value)
    );
    setIsDisabled(
        inputUserName.current.value == '' || inputPass.current.value == '',
>>>>>>> bb4cafab701cadaef4569b44db881da3ae8628b0
    );
        
};

<<<<<<< HEAD
  const loginClick = async () => {
    await axios
      .post(
=======
const loginClick = async () => {
    const response: any = await axios
    .post(
>>>>>>> bb4cafab701cadaef4569b44db881da3ae8628b0
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
<<<<<<< HEAD
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
=======
        )
        .then((res: any) => {
            const result = res?.data?.status;
            setToken(result == 200 ? 'Oke' : 'Incorrect password or account');
            result == 200 ? router.push('/') : null;
      
            cookies.set('account_token', res.data.data.id, {
              secure: process.env.NODE_ENV !== 'development',
              maxAge: res.data.data.expiry_date,
              sameSite: 'strict',
              path: '/'
            });

            setCookie(cookies.get('account_token'))

          }).catch((error: any) => error);
        };
    
    return (
    <>
      <div className={`${styles.login} text-black`}>
        <div className={`${styles.title}`}>CALOBYE</div>
        <form className={`${styles.form}`}>
          <input
            className={`${styles.input} rounded`}
            type="text"
            ref={inputUserName}
            name="uname"
            onChange={valueUser}
            placeholder="UserName..."
          />{' '}
          <br />
          {/* <span className={`text-red-500`}>{userName}</span> */}
          <br />
          <input
            className={`${styles.input} rounded`}
            type="password"
            ref={inputPass}
            name="pass"
            onChange={valueUser}
            placeholder="PassWord..."
          />
          <br />
          {/* <span className={`text-red-500`}>{passWord}</span> */}
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
    </>
>>>>>>> bb4cafab701cadaef4569b44db881da3ae8628b0
  );
}
