import React, { useEffect } from 'react'
import { useUser, SignOutButton, UserProfile } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate()
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div>
      {
        isSignedIn ? (
          <>
            
            <SignOutButton signOutCallback={() => navigate('/sign-in')} />
          </>
        ) : (
          <div>Page not found</div>
        )
      }

    </div>
  )
}

export default Home