import React, { useEffect, useRef, useState } from 'react'
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
const Onboarding = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    let email = useRef(null)
    let username = useRef(null)
    let diagnosed = useRef(null)
    let [emailValid, setEmailValid] = useState(true)
    let [usernameValid, setUsernameValid] = useState(true)
    let [diagnosedValid, setDiagnosedValid] = useState(true)
    const navigate = useNavigate()
    
    const isEmailValid = () => {
        if(email.current != user.emailAddresses[0].emailAddress || email.current == null){
            setEmailValid(false)
            return false
        }
        return true
    }
    const isUsernameValid = () => {
        if(username.current != user.username){
            setUsernameValid(false)
            return false
        }
        return true
    }
    const isDiagnosedValid = () => {
        if(typeof diagnosed.current != 'string'){
            setDiagnosedValid(false)
            return false
        }
        return true
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isEmailValid() && isUsernameValid() && isDiagnosedValid()){
            let info = {
                userId:user.id,
                email:email.current,
                username: username.current,
                diagnosed: diagnosed.current
            }
            console.log(info)
            console.log(user)
            navigate('/home')

        }
        else{
            console.log("error")
        }
        //info obejct will be sent to backend /register
        //after receving response from backend, user will be redirected to /home screen

        

        
    }

   
  return (
    <>
    <div onSubmit={handleSubmit}>
        <h2>Onboarding</h2>
        <form style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField error={!emailValid} helperText={!emailValid && "Please provide correct email"} ref={email} onChange={(e) => {email.current=e.target.value}} label="Enter your Email"  style={{width:'50%', margin:'5px'}} />

            <TextField error={!usernameValid} helperText={!usernameValid && "Please provide correct usrname"} ref={username} onChange={(e) => {username.current=e.target.value}} label="Enter your Username" variant="outlined" style={{width:'50%', margin:'5px'}} />

            <TextField error={!diagnosedValid} helperText={!diagnosedValid && "Diagnosed field should not be empty"} ref={diagnosed} onChange={(e) => {diagnosed.current=e.target.value}} label="Diagnosed with?" variant="outlined" style={{width:'50%', margin:'5px'}} />

            <button type='submit' className="button-28" role="button">Submit</button>
        </form>
    </div>
    </>
    
  )
}

export default Onboarding