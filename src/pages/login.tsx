import React, {useEffect} from 'react';
import Login from '../components/Authentication/Login';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();
export default function login() {
  const router = useRouter();

  useEffect(() => {
    if (cookies.get('account_token')) {
      router.push('/');
    } 
  }, [cookies.get('account_token')]);
  
  return <Login />
}
