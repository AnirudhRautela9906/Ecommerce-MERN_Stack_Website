import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Loader from "../layout/Loader/Loader.js";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";

const ForgotPassword = () => {
    const {error,message,loading} = useSelector((state) => state.forgotPassword)
    const dispatch = useDispatch()
   const [email,setEmail] = useState("")
   const [errorOpen, setErrorOpen] = React.useState(false);
   const [successOpen, setSuccessOpen] = React.useState(false);
   const [title, setTitle] = React.useState("");


const forgotPasswordSubmit = (e)=>{
    e.preventDefault()
    dispatch(forgotPassword(email))
}
 


useEffect(() => {
     if(message){
      setSuccessOpen(true)
      setTitle(message)
    
  }
 else if(error)  {
  setErrorOpen(true)
  setTitle(error)

}
}, [dispatch,error,message])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Forgot Password`} />

          <div className="forgotPasswordContainer flexCenterRow">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm flexCenterColumn"
                encType="multipart/form-data"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPassword">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    id="confirmPassword"
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
      <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
  <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
    </Fragment>
  );
};

export default ForgotPassword;
