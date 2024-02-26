import React, { useRef } from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { logout } from '../../../actions/userAction';
import {SuccessAlert} from "../../layout/MuiAlert"
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
// import InventoryIcon from '@mui/icons-material/Inventory';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const {user,isAuthenticated} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [toggle, setToggle] = React.useState(true);
  const [title,setTitle]=React.useState("")
  const headerSidebar = useRef() 
  const coverbg = useRef() 
  const toggleText = (e) =>{
   setToggle(toggle => !toggle)
headerSidebar.current.classList.toggle('header-toggle')
coverbg.current.classList.toggle('overlay')
  }
  const toggleClose = (e) =>{
   setToggle(true)
headerSidebar.current.classList.remove('header-toggle')
coverbg.current.classList.remove('overlay')
  }
 
  let toggleClass = toggle ? "headerText" : null

  function logoutUser() {
    dispatch(logout());
      setOpen(true)
      setTitle("SEE YOU SOON")
     
  }

  
  
  return (
    <div className='header'>
        <ul className='flexCenterRow desktop'>
            {/* <li>
                <Link to="/" >Home</Link>
            </li> */}
            <li>
                <Link to="/">Home</Link>
                {/* <Link to="/products">Products</Link> */}
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>

            <li>
                {isAuthenticated ?<Link to="/my-account"><PersonIcon/></Link>:<Link to="/login-signup">Login/SignUp</Link>}
            </li>
            {isAuthenticated &&<li>
                <Link  onClick={logoutUser}>Logout</Link>
            </li>}
          
            {isAuthenticated &&<li>
                <Link  to='/cart' ><ShoppingCartIcon/></Link>
            </li>}
            {user?.role === "Admin" && <li>
                <Link  to="/admin/dashboard">Dashboard</Link>
            </li>}

        </ul>


        <ul className='flexCenterRow mobile header-sidebar' ref={headerSidebar}>
            <li>
               <Link onClick={toggleText}>  {toggle ? <MenuIcon/> : <CloseIcon/> } </Link>
            </li>
            {/* <li>
               <Link to="/" onClick={toggleClose}>  <HomeIcon/> <div className={`${toggleClass} header-text`} >Home</div></Link>
            </li> */}
            <li>
                <Link to="/" onClick={toggleClose} > <HomeIcon/><div className={`${toggleClass} header-text`}>Home</div></Link>
            </li>
            <li>
                <Link to="/about" onClick={toggleClose} > <InfoIcon/><div className={`${toggleClass} header-text`}>About</div></Link>
            </li>
            <li>
                <Link to="/contact" onClick={toggleClose} > <ContactPageIcon/><div className={`${toggleClass} header-text`}>Contact</div></Link>
            </li>

            <li>
                {isAuthenticated ?<Link to="/my-account" onClick={toggleClose} > <AccountCircleIcon/><div className={`${toggleClass} header-text`}>My Account</div></Link>:<Link to="/login-signup" onClick={toggleClose}> <LoginIcon/> <div className={`${toggleClass} header-text`}>Login/Signup</div></Link>}
            </li>
            {isAuthenticated &&<li>
                <Link  onClick={()=> {logoutUser();toggleClose()}}> <LogoutIcon/> <div className={`${toggleClass} header-text`}>Logout</div></Link>
            </li>}
            {isAuthenticated &&<li>
                <Link to='/cart'  onClick={toggleClose} ><ShoppingCartIcon/><div className={`${toggleClass} header-text`}>Cart</div></Link>
            </li>}
            {user?.role === "Admin" && <li>
                <Link  to="/admin/dashboard" onClick={toggleClose} > <DashboardIcon/> <div className={`${toggleClass} header-text`}>Dashboard</div></Link>
            </li>}

        </ul>
        <div ref={coverbg}></div>
<SuccessAlert open={open} title={title} setOpen={setOpen}/>

    </div>
 
)
}

export default Header