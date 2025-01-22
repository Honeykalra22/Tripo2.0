import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../Authentication/Login.jsx';

function AuthStatus({children, authentication}) {
    const authStat = useSelector(state => state.auth?.status);

    if(authentication && !authStat) return <Login/>
    
  return (
    <>
      {children}
    </>
  )
}

export default AuthStatus