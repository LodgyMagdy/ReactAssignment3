import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Guard({children}) {

  if (!localStorage.getItem("token")){
    return <Navigate to="/login"/>
  }
  
  return children
  
}