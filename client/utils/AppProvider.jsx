// This util file surrounds the overall application and passes down Context to allow the children to verify users on the various pages

import Cookie from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

// Create the context itself
const AppContext = createContext({})

// Create a React hook that will allow other components to use the context 
export const useAppCtx = () => useContext(AppContext)

export default function AppProvider(props){

  const [ user, setUser ] = useState({})

  async function verifyUser(){
    const cookie = Cookie.get("auth-cookie")

    if(!cookie && window.location.pathname !== "/" && !window.location.pathname.includes("/auth")){
      window.location.href = "/auth"
    }
    
    try {
      const query = await fetch("/api/users/verify")
      const response = await query.json()
      if( response.result === "success" ){
        setUser(response.payload)
      }
    } catch(err){
      if( window.location.pathname !== "" && !window.location.pathname.includes("/auth")) {
        window.location.href = "/auth"
      }
    }
  }

  useEffect(() => {
    verifyUser()
  },[])


  return (
    <AppContext.Provider value={{ user, verifyUser }}>
      { props.children }
    </AppContext.Provider>
  )
}