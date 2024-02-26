import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, deleteProduct } from "../../actions/productAction";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import LaunchIcon from "@mui/icons-material/Launch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";


const ProductList = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const { error, products, loading } = useSelector((state) => state.products); 
  const { isDeleted ,deleteError } = useSelector((state) => state.productDelete); 
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 250, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 250 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 150 },
    { field: "price", headerName: "Price (Rs)", type: "number", minWidth: 270 },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 350,
      sortable: false,
      
      renderCell: (params) => {
        function func(){
          setId(params.row.id)
        setName(params.row.name)
        handleClickOpen()
        }
        return (
          <Fragment>
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
              Edit
            </Link>
            <Button onClick={func}>
              <DeleteIcon />
              Delete
            </Button>
            <Link to={`/product/${params.row.id}`}>
              <LaunchIcon />
            </Link>
          </Fragment>
          
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
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
    dispatch(deleteProduct(id));
    setOpen(false);

  };

  

  useEffect(() => {

    if (error || deleteError) {
      setErrorOpen(true)
      setTitle(error || deleteError)
     
    }
    
    if(isDeleted){
      setSuccessOpen(true)
      setTitle("Product Deleted Successfully")
      
      dispatch({type:DELETE_PRODUCT_RESET})
    }
    dispatch(getAdminProducts());
  }, [error, dispatch,isDeleted,deleteError]);
  return (
    <Fragment>
      <MetaData title={`ADMIN - ALL PRODUCTS`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            <h1 id="productListHeading">All Products</h1>
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

export default ProductList;
