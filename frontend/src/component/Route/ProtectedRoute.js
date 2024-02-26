import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";
import Loader from '../layout/Loader/Loader';
const ProtectedRoute = () => {
  const {  isAuthenticated,loading } = useSelector((state) => state.user);

 
  return(
    <>
      {
        loading ? <Loader/> :
        ((isAuthenticated === true && <Outlet/>) ||  (isAuthenticated === false &&   <Navigate to="/login-signup" />))
      }
    </>
  )
};
  

export default ProtectedRoute;
