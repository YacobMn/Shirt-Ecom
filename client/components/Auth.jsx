// largely untouched from the boilerplate, only handles the login part of our signup/login page

import { useEffect, useState } from "react"
import { useAppCtx } from "../utils/AppProvider"


export default function Auth({usage="signup"}){

  const appCtx = useAppCtx()

  const [ userData, setUserData ] = useState({ email: "", password: "", firstname: '', lastname: '', height: 0, weight: 0, gender: '', totalCalories: 0, bmi: 0.0})

  function handleInputChange(e){
    setUserData({...userData, [e.target.name]: e.target.value })
  }

  async function handleFormSubmit(e){
    e.preventDefault()
    const apiPath = (usage === "signup") ? "/" : "/auth"
    const finalPath = `/api/users${apiPath}`

    try {
      const query = await fetch(finalPath, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const response = await query.json()
      console.log(response)
      if( response.result === "success" ){
        window.location.href = "/"
      }
    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    setUserData({...userData, email: appCtx.user.email || "" })
  },[appCtx])


  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <h2>{ usage === "signup" ? "Signup" : "Login" }</h2>
          <div>
            <div>
              <label className="d-block">Email Address</label>
              <input type="text" name="email" value={userData.email} onChange={handleInputChange} />
            </div>

            <div>
              <label className="d-block">Password</label>
              <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
            </div>
          </div>

          <button className="mt-2">Come on in!</button>
        </div>
      </form>
    </div>
  )

}