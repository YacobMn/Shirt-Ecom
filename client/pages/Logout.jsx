// This page removes the cookie and logs the user out before sending them back to the homepage, and was largely untouched

import { useEffect } from "react"
import Cookie from "js-cookie"


export default function Logout(){
  

  useEffect(() => {
    Cookie.remove("auth-cookie")
    window.location.href="/"
  },[])

  return (
    <>
    </>
  )
}