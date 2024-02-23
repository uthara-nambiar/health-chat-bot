import { useState } from 'react'
import './App.css'
import { SignedOut, SignedIn, SignOutButton, SignInButton, } from "@clerk/clerk-react"
import Signin from './components/Sign-in'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Sign-up'
import Onboarding from './components/Onboarding'
import Chat from './components/Chat';
import PageNotFound from './components/PageNotFound';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<Signin/>} />
        <Route path='/sign-up' element={<Signup/>} />
        <Route path='/home' element={<Chat/>} />
        <Route path='/onboarding' element={<Onboarding/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
      

    </>
  )
}

export default App
