import React, { useEffect } from 'react'
import { useUser, SignOutButton, UserProfile } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate()
  const { isSignedIn, user, isLoaded } = useUser();
  console.log("user", user)

  return (
    <div>
      {
        isSignedIn ? (
          <>
            
            <SignOutButton signOutCallback={() => navigate('/sign-in')} />
          </>
        ) : (
          <div className='dot-pulse'></div>
        )
      }

    </div>
  )
}

export default Home