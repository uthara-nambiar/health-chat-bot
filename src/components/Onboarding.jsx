import React, { useContext, useEffect, useRef, useState } from 'react'
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import { Info } from '../context/Context';
import axios from 'axios';
const Onboarding = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    let email = useRef(null)
    let username = useRef(null)
    let diagnosed = useRef(null)
    let [emailValid, setEmailValid] = useState(true)
    let [usernameValid, setUsernameValid] = useState(true)
    let [diagnosedValid, setDiagnosedValid] = useState(true)
    const {setUsername, setDiagnosed,setEmail} = useContext(Info)
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
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if(isEmailValid() && isUsernameValid() && isDiagnosedValid()){
            let info = {
                email:email.current,
                username: username.current,
                disease: diagnosed.current
            }
            const res = await axios.post("http://127.0.0.1:5000/register", info, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log('res', res)
            console.log(user)
            setUsername(username.current)
            setEmail(email.current)
            setDiagnosed(diagnosed.current)

            navigate('/home')

        }
        else{
            console.log("error")
        }
        //info obejct will be sent to backend /register
        //after receving response from backend, user will be redirected to /home screen  
    }

   
  return (
    <div className='main-div'>
    <div className="onboarding-form">
    <div onSubmit={handleSubmit}>
        <h2 style={{marginBottom: "20px"}}>Onboarding</h2>
        <p className='onboarding-sub-text'>Please fill in below details to access our chat portal!</p>
        <form style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField error={!emailValid} helperText={!emailValid && "Please provide correct email"} ref={email} onChange={(e) => {email.current=e.target.value}} label="Enter your Email"  style={{width:'50%', margin:'5px'}} />

            <TextField error={!usernameValid} helperText={!usernameValid && "Please provide correct usrname"} ref={username} onChange={(e) => {username.current=e.target.value}} label="Enter your Username" variant="outlined" style={{width:'50%', margin:'5px'}} />

            <TextField error={!diagnosedValid} helperText={!diagnosedValid && "Diagnosed field should not be empty"} ref={diagnosed} onChange={(e) => {diagnosed.current=e.target.value}} label="Diagnosed with?" variant="outlined" style={{width:'50%', margin:'5px'}} />

            <button type='submit' className="button-28" role="button">Submit</button>
        </form>
    </div>
    </div>
    </div>
  )
}

export default Onboarding