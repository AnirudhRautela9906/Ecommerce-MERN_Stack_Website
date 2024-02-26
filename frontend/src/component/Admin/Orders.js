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
import { deleteOrder, getAllOrders } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";

const Orders = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { isDeleted, Error } = useSelector(
    (state) => state.order
  );
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  const columns = [
  

    { field: "id", headerName: "Product ID", minWidth: 250, flex: 0.5 },
    { field: "status", headerName: "Status", minWidth: 250 },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Amount(Rs)",
      type: "number",
      minWidth: 270,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 350,
      sortable: false,

      renderCell: (params) => {
        function func() {
          setId(params.row.id);
          handleClickOpen();
        }
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
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
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.reduce(
          (accumulator, element) => accumulator + element.quantity,
          0
        ),
        amount: item.totalPrice,
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
    dispatch(deleteOrder(id));
    setOpen(false);
  };

  

  useEffect(() => {

    if (error || Error) {
      setErrorOpen(true)
        setTitle(error || Error)
    
    }
    if (isDeleted) {
      setTitle("Order Deleted Successfully")
      setSuccessOpen(true)
     
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [error, dispatch, isDeleted, Error]);
  return (
    <Fragment>
      <MetaData title={`ADMIN - ALL ORDERS`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            <h1 id="productListHeading">All Orders</h1>
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
                {`Are you sure, you want to Delete this Order ?`}
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
      )}
      <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
    <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
    </Fragment>
  );
};

export default Orders;
