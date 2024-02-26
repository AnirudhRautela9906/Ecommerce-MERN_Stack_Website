import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";



const AdminRoute = () => {
  const {  user } = useSelector((state) => state.user);

  if(user.role === "Admin"){
  return ( <Outlet/> )}
  else { return <Navigate to="/my-account" />}
}

export default AdminRoute