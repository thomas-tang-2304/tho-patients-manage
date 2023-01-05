import React, { useRef, useState } from 'react'
import styles from '../styles/Login.module.css'
import ReactDom from 'react-dom/client'
import Button from '@mui/material/Button'
import cookie from 'cookiejs'
import {NextRouter, useRouter} from 'next/router'

export default function Login() {
    const [useName, setUseName] = useState()
    const [pass, setPass] = useState()
    const [isDisabled, setIsDisabled] = useState(true)

    const inputUserName: any = useRef();
    const inputPass: any = useRef();
    const router = useRouter();

    const http = require('http');
    // const Cookie = require('cookies');
    const loginClick = () => {
        const use = inputUserName.current.value == "" ?  "không UserName để trống !!!": inputUserName.current.value;
        const pass = inputPass.current.value == "" ? "không PassWord để trống !!!" : inputPass.current.value;
        
        setIsDisabled(inputUserName.current.value == "" ||  inputPass.current.value == "" );
        const token = cookie.get('token') == true ? router.push('../') : console.log("Vui lòng nhập lại!!!");

        
    }
  return (
    <>
        <div className={`${styles.login} text-black`}>
            <div className={`${styles.title}`}>CALOBYE</div>
            <form className={`${styles.form}`}>
                <input className={`${styles.input} my-4 mb-6.5 rounded`} type="text" ref={inputUserName} name='uname' onChange={loginClick} placeholder='UserName...'/> <br/>
                <span id='use'></span>
                <input className={`${styles.input} mb-20 rounded`} type="password" ref={inputPass} name='pass' onChange={loginClick} placeholder='PassWord...'/>
                <span id='pass'></span>
            </form>
            <span>
            <Button disabled={isDisabled} className={`${styles.button} rounded text-white`} onClick={loginClick} variant="contained">Login</Button>
            
            </span>
        </div>
    </>
  )
}
