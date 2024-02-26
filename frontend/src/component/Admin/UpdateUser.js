import React, { Fragment,useEffect ,useState } from 'react'
import "./NewProduct.css"
import {useSelector,useDispatch} from "react-redux"
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import Loader from "../layout/Loader/Loader"
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {  useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../../actions/userAction';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotFound from "../../component/layout/NotFound.js";
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";



const UpdateUser = () => {
    const dispatch = useDispatch()
    const {loading,Error,user}= useSelector(state => state.userDetails)
    const {isUpdated,error}= useSelector(state => state.user)
    // const {isUpdated,error}= useSelector(state => state.profile)
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [title, setTitle] = useState("");
    const [role, setRole] = useState("")  
   
    const {id} =useParams()

      const createProductSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("role",role)
        dispatch(updateUser(id,myForm))
      }

   
    
      useEffect(() => {
        if(error || Error){
            setErrorOpen(true)
        setTitle(error || Error)
          }
        if(user && user._id !== id){
            dispatch(getUserDetails(id))
           }else{   
            setRole(user.role)
            
        }
       
       

        if(isUpdated){
            setSuccessOpen(true)
        setTitle("User Updated Successfully")
           
                dispatch({type:UPDATE_USER_RESET})
            dispatch(getUserDetails(id))

        }
      }, [error,dispatch,isUpdated,Error,id,user])
if(Error){
    return <NotFound text={"User Not Found"} />;

}
  return (
    <Fragment>
    <MetaData title={`ADMIN - UPDATE USER`} />
    {loading ? <Loader/> :
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form  className="createProductForm"  encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
            <h1>Update User</h1>
                <div>
                    <AccountCircleIcon/>
                    <input 
                    type="text"  
                    placeholder='Name'
                    required
                    value={user.name}
                    id='name'
                    readOnly
                    // onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>
                <div >
                    <MailOutlineIcon/>
                    <input 
                    type="text"  
                    placeholder='Email'
                    required
                    value={user.email}
                    id='email'
                    readOnly
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <AccountCircleIcon/>
                    <input 
                    type="text"  
                    placeholder='Name'
                    required
                    value={user.phone === "1234567890" ? "Not Uploaded" : user.phone }
                    id='name'
                    readOnly
                    // onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>
             
                <div>
                <AccountTreeIcon/>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                   
                </select>
                </div>
                
                <Button
                 id='createProductBtn'
                 type="submit"
                 disabled={loading ?  true : false}
                >
                Update user
                </Button>
               
            </form>
        </div>
    </div>
      }
      <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
      <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
   </Fragment>
  )
}

export default UpdateUser