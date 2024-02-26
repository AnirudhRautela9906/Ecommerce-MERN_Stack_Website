import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";


const Users = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const { Error, users,loading } = useSelector((state) => state.allUsers); 
  // const { isDeleted ,message ,error} = useSelector((state) => state.user); 
  const { isDeleted ,message ,error} = useSelector((state) => state.user); 
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200 ,sortable: false,},
    { field: "email", headerName: "Email", minWidth: 250 ,flex:.5,sortable: false,},
    { field: "name", headerName: "Name", minWidth: 250 ,sortable: false,},
    { field: "role", headerName: "Role", minWidth: 200 },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 250,
      sortable: false,
      
      renderCell: (params) => {
        function func(){
          setId(params.row.id)
        setName(params.row.name)
        handleClickOpen()
        }
        return (
          <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
              Edit
            </Link>
            <Button onClick={func}>
              <DeleteIcon />
              Delete
            </Button>
            
          </Fragment>
          
        );
      },
    },
  ];
  const rows = [];
  users &&
  users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
 
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    dispatch(deleteUser(id));
    setOpen(false);
  };


  useEffect(() => {

    if (error || Error) {
      setErrorOpen(true)
        setTitle(error || Error)
    }
    if(isDeleted){
      setSuccessOpen(true)
      setTitle(message)
     
      dispatch({type:DELETE_USER_RESET})
    }
    dispatch(getAllUsers());
  }, [error, dispatch,isDeleted,Error,message]);
  return (
    <Fragment>
      <MetaData title={`ADMIN - ALL PRODUCTS`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            <h1 id="productListHeading">All Users</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              className="productListTable"
              headerAlign="center"
              align="center"
              autoPageSize
            />
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Product?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Are you sure, you want to Delete ${name} ?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button onClick={handleAgree} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
    <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
    </Fragment>
  );
};



export default Users