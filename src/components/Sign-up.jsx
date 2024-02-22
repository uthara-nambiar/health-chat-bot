import React from 'react'
import { SignUp, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const {isSignedIn} = useUser()
  if(isSignedIn){localStorage.clear()}
  return (
    <div>
        <SignUp/>
    </div>
  )
}

export default Signup