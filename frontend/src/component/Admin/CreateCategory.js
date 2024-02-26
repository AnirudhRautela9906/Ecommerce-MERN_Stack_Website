import React, { Fragment, useEffect, useState } from "react";
import "./NewCategory.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import {  useNavigate } from "react-router-dom";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../actions/categoriesAction";

const CreateCategory = () => {
  const dispatch = useDispatch();

  const { categories, loading ,isUpdated} = useSelector((state) => state.categories);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [openUpd, setOpenUpd] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);

  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const updCategory = (Id) => {
    setOpenUpd(true);
    setId(Id)
  };
  const delCategory = (id) => {
    setOpenDel(true);
    setId(id)
  };
 

  const handleCloseUpd = () => {
    setOpenUpd(false);
  };

  const handleClickUpdate = () => {
    setOpenUpd(false);
    dispatch(updateCategory(id,category))
  };



  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleClickDelete = () => {
    setOpenDel(false);
       dispatch(deleteCategory(id))

  };





  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name));
    setName("");
  };

  useEffect(() => {
    if(isUpdated){
        dispatch(getAllCategories());
    }
    dispatch(getAllCategories());
  }, [dispatch, navigate,isUpdated]);

  return (
    <Fragment>
      <MetaData title={`ADMIN - CREATE CATEGORY`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <div className="createCategoryForm">
              <form
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <h1>Create Category</h1>
                <div className="createDiv">
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Category Name"
                    required
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Button
                    id="createCategoryBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
                  </Button>
                </div>
              </form>

              <div className="categoryList">
                {categories.map((cate) => (
                  <div className="category" key={cate.category}>
                    <p>{cate.category}</p>{" "}
                    <div>
                      <button onClick={() => updCategory(cate._id)}>
                        <EditIcon />
                      </button>
                      <button onClick={() => {delCategory(cate._id);setCategory(cate.category)}}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Dialog open={openDel} onClose={handleCloseDel} aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete Category?</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete <b>{category}</b> category? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"red"}} onClick={handleCloseDel}>Cancel</Button>
          <Button onClick={handleClickDelete}>Delete </Button>
        </DialogActions>
      </Dialog>


              <Dialog open={openUpd} onClose={handleCloseUpd}>
        <DialogTitle>Update Category?</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=> setCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"red"}} onClick={handleCloseUpd}>Cancel</Button>
          <Button onClick={handleClickUpdate}>Update </Button>
        </DialogActions>
      </Dialog>

            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CreateCategory;
