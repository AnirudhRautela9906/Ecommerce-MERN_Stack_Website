import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader.js";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../../actions/userAction";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import passToText from '../layout/PassToggle'
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";
import { useNavigate } from "react-router-dom"

const UpdatePassword = () => {
    const [oldPassInputType,oldIconToggle] = passToText()
    const [newPassInputType,newIconToggle] = passToText()
    const [confirmPassInputType,confirmIconToggle] = passToText()
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  // const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

 
  const navigate = useNavigate()

  useEffect(() => {

    if (error) {
      setErrorOpen(true)
      setTitle(error)
     
    }
    if (isUpdated) {
      setSuccessOpen(true)
      setTitle(`Password Changed Successfully`)
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      setTimeout(() => {
        navigate('/my-account')
      }, 1000);

    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        
          <Fragment>
            <MetaData title={`Change Password`} />

            <div className="updatePasswordContainer flexCenterRow">
              <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading">Update Password</h2>

                <form
                  className="updatePasswordForm flexCenterColumn"
                  encType="multipart/form-data"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="updatePassword">
                    <KeyIcon />
                    <input
                     type={oldPassInputType}
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      id="oldPassword"
                      autoComplete="on"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  <span className="eye">
                    {oldIconToggle}
                    </span>
                  </div>
                  <div className="updatePassword">
                    <LockOpenIcon />
                    <input
                      type={newPassInputType}
                      placeholder="New Password"
                      required
                      value={newPassword}
                      id="newPassword"
                      autoComplete="on"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span className="eye">
                    {newIconToggle}
                    </span>
                  </div>
                  <div className="updatePassword">
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
                    value="Change Password"
                    className="updatePasswordBtn"
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

export default UpdatePassword;
