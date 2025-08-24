import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext(null)

export default function AuthContext({children}) {

  const [token , setToken] = useState(null)
  const [userData , setUserData] = useState(null)


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token){
      setToken(token)
    }
  }, [])

  useEffect(() => {
    if (token){
      getProfileData(token)
    } else {
      setUserData(null)
    }
  }, [token])

  async function getProfileData (token) {
    try {
      const {data} = await axios.get("https://linked-posts.routemisr.com/users/profile-data" , {
        headers: {
            token: token
        }
      })

     if (data.message === "success") {
        setUserData (data.user)
     } else if (data.error) {
       throw new Error (data.error)
     }


    } catch(error) {
        console.log(error)
    }
  }
  
  return (
    <authContext.Provider value={{token , setToken , userData , getProfileData}}>{children}</authContext.Provider>
  )
}
