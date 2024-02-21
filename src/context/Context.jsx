import { createContext, useState } from "react";

export const Info = createContext()

const Context = ({children}) => {
    const [userName, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Diagnosed, setDiagned] = useState('')
    return <Info.Provider value={{userName, setUsername, Diagnosed, setDiagned, Email,setEmail}}>{children}</Info.Provider>;
}


export default Context