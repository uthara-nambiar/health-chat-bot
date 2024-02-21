import { createContext, useState } from "react";

export const Info = createContext()

const Context = ({children}) => {
    const [userName, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Diagnosed, setDiagnosed] = useState('')
    return <Info.Provider value={{userName, setUsername, Diagnosed, setDiagnosed, Email,setEmail}}>{children}</Info.Provider>;
}


export default Context