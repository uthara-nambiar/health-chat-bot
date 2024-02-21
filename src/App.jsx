import { useState } from 'react'
import './App.css'
import { SignedOut, SignedIn, SignOutButton, SignInButton, } from "@clerk/clerk-react"
import Signin from './components/Sign-in'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Signup from './components/Sign-up'
import Onboarding from './components/Onboarding'
import Chat from './components/Chat';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<Signin/>} />
        <Route path='/sign-up' element={<Signup/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/onboarding' element={<Onboarding/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </BrowserRouter>
      

    </>
  )
}

export default App
