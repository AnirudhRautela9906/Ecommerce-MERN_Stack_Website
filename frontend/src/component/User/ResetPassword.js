import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader.js";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../actions/userAction";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MetaData from "../layout/MetaData";
import passToText from '../layout/PassToggle'
import {useNavigate, useParams} from "react-router-dom"
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";


const ResetPassword = () => {
    const [newPassInputType,newIconToggle] = passToText()
    const [confirmPassInputType,confirmIconToggle] = passToText()
  const { error, success, loading } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const {token} = useParams()
  const navigate = useNavigate()

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");  

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };


  useEffect(() => {

    if (error) {
      setErrorOpen(true)
        setTitle(error)
    }
    if (success) {
      setSuccessOpen(true)
        setTitle(`Password Updated Successfully`)
     
setTimeout(() => {
  navigate("/login-signup")
}, 1000);

    }
  }, [dispatch, error, success,navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
          <Fragment>
            <MetaData title={`Reset Password`} />

            <div className="resetPasswordContainer flexCenterRow">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Password </h2>

                <form
                  className="resetPasswordForm flexCenterColumn"
                  encType="multipart/form-data"
                  onSubmit={resetPasswordSubmit}
                >
                 
                  <div className="resetPassword">
                    <LockOpenIcon />
                    <input
                      type={newPassInputType}
                      placeholder="New Password"
                      required
                      value={password}
                      id="newPassword"
                      autoComplete="on"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="eye">
                    {newIconToggle}
                    </span>
                  </div>
                  <div className="resetPassword">
                    <LockIcon />
                    <input
                      type={confirmPassInputType}
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      id="confirmPassword"
                      autoComplete="on"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="eye">
                    {confirmIconToggle}
                    </span>
                    
                  </div>
                  <input
                    type="submit"
                    value="Update Password"
                    className="resetPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
      )}
      <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
<ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
    </Fragment>
  )
}

export default ResetPassword