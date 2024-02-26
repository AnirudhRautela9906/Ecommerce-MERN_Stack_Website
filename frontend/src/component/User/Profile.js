import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAddress } from "../../actions/userAction";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [id, setId] = React.useState("");
  const [address, setAddress] = React.useState("");

  const delAddress = (id) => {
    setOpen(true);
    setId(id);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    dispatch(deleteAddress(id));
    setOpen(false);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/profile_update">Update Profile</Link>
              <Link to="/password_update">Change Password</Link>
              <Link to="/orders">My Orders</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Phone No.</h4>
                <p>
                  {user.phone === "1234567890"
                    ? "Update Phone Number In Profile"
                    : user.phone}
                </p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Gender</h4>
                <p>{user.gender}</p>
              </div>

              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <h4>Address</h4>
                {user.address.length === 0 && <p>Update Address</p>}
                {user.address &&
                  user.address.map((item, index) => (
                    <div key={index} className="address">
                      <p>
                        {item.line},{item.landmark},{item.city},{item.pincode},
                        {item.state},{item.country}{" "}
                      </p>
                      <div>
                        <Link
                          to={`/update_address/${item._id}`}
                          onClick={() => localStorage.setItem("index", index)}
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={() => {
                            delAddress(item._id);
                            setAddress(
                              `${item.line}, ${item.landmark}, ${item.city}, ${item.pincode}, ${item.state}, ${item.country}`
                            );
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <Link to={user.address.length > 2 ? "#0" : "/add_address"}>
                  Add Address
                </Link>
              </div>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Address?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Are you sure, you want to Delete this Address: \n ${address}`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleAgree} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
