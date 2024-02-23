import React from 'react'
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const navigate = useNavigate()
  const {isSignedIn} = useUser()
  if(isSignedIn){localStorage.clear()}

  return (
    <div className='sign-in'>
        <SignIn/>
    </div>
  )
}

export default Signin