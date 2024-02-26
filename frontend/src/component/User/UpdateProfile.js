import React, { Fragment, useEffect, useState} from 'react'
import './UpdateProfile.css'
import Loader from '../layout/Loader/Loader.js'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useSelector,useDispatch} from "react-redux"
import {loadUser, updateProfile} from "../../actions/userAction"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData'
import {SuccessAlert,ErrorAlert} from "../layout/MuiAlert"
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from "react-router-dom"


const UpdateProfile = () => {

    const {user} = useSelector((state) => state.user)
    const {error,isUpdated,loading} = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [title,setTitle]=React.useState("")

   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [phone, setPhone] = useState("")
   const [gender, setGender] = useState("")

    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState()
    const navigate = useNavigate()


    const updateProfileSubmit = (e)=>{
        e.preventDefault()
        const myForm = new FormData()

        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("phone",phone)
        myForm.set("gender",gender)
        myForm.set("avatar",avatar)

        dispatch(updateProfile(myForm))

    }

    const updateProfileDataChange = (e)=>{
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        
      
        
        useEffect(() => {
                if(user){
                    setName(user.name)
                    setEmail(user.email)
                    setPhone(user.phone === "1234567890" ? "" : user.phone )
                    setGender(user.gender)
                    setAvatarPreview(user.avatar?.url)
                }
               if(error){
                   setTitle(error) 
                   setErrorOpen(true)
               }
               if(error === "Could not decode base64"){
                   setTitle("Please Upload a small size image of less than 200kb") 
                   setErrorOpen(true)
               }
          if(isUpdated){
              setTitle(`Profile Updated Successfully`) 
              setSuccessOpen(true)
              dispatch({
                  type: UPDATE_PROFILE_RESET
                })
                setTimeout(() => {
                  dispatch(loadUser())
                navigate('/my-account')
              }, 1000);
          }
        }, [dispatch, error, isUpdated, navigate, user])

  return (
    <Fragment>
        {
            loading ? <Loader/> :

            <Fragment>

                <MetaData title={`Update Profile`} />
        
                <div className="updateProfileContainer flexCenterRow">
                <div className="updateProfileBox">
                    
                    <h2 className='updateProfileHeading'>Update Profile</h2>
                   
                    <form  className="updateProfileForm flexCenterColumn"  encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                        <div className="updateProfileName">
                            <AccountCircleIcon/>
                            <input 
                            type="text"  
                            placeholder='Name'
                            required
                            value={name}
                            id='name'
                            onChange={(e)=> setName(e.target.value)}
                            />
                            
                        </div>
                        <div className="updateProfileEmail">
                            <MailOutlineIcon/>
                            <input 
                            type="email"  
                            placeholder='Email'
                            required
                            value={email}
                            id='email'
        
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileEmail">
                            <PhoneIcon/>
                            <input 
                            type="phone"  
                            placeholder='Phone Number'
                            required
                            value={phone}
                            id='phone'
        
                            onChange={(e)=> setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                <AccountCircleIcon/>
                <select value={gender}  onChange={(e) => setGender(e.target.value)}>
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                </div>
                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file"
                            name='avatar'
                            id='avatar'
                            accept='image/*'
                            onChange={updateProfileDataChange}
                            />
                        </div>
                        <input type="submit"
                        value="Update Profile"
                        className='updateProfileBtn'
                        />
                    </form>
                </div>
            </div>
         <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
        <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen}/>

            </Fragment>
        }
    </Fragment>
  )
}

export default UpdateProfile