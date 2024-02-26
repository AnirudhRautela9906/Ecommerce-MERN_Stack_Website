import React, { Fragment,useEffect ,useState } from 'react'
import "./NewProduct.css"
import {useSelector,useDispatch} from "react-redux"
import {createProduct} from "../../actions/productAction"
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import Loader from "../layout/Loader/Loader"
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../actions/categoriesAction';
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";

const NewProduct = () => {
    const dispatch = useDispatch()
    const {newProductError,success,loading}= useSelector(state => state.newProduct)
    const [name, setName] = useState("")  
    const [price, setPrice] = useState(10000)  
    const [description, setDescription] = useState("")  
    const [category, setCategory] = useState("")  
    const [stock, setStock] = useState(1)  
    const [images, setImages] = useState([])  
    const [imagesPreview, setImagesPreview] = useState([])  
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [title, setTitle] = useState("");

    const navigate = useNavigate()

    const {categories} =  useSelector(state => state.categories)
   
      const createProductSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set("name",name)
        myForm.set("price",price)
        myForm.set("description",description)
        myForm.set("category",category)
        myForm.set("stock",stock)
        
        images.forEach(image => {
            myForm.append("images",image)
        });

        dispatch(createProduct(myForm))
      }

      const createProductImagesChange = (e) =>{
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])

        files.forEach((file) => {
            const reader = new FileReader()            

            reader.onload = () =>{
                if(reader.readyState === 2){
                    setImagesPreview((old)  => [...old, reader.result])
                    setImages((old)  => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file)
        });
      }
    
      useEffect(() => {
        dispatch(getAllCategories())
        if(newProductError === "Cannot read properties of undefined (reading 'length')"){
            setTitle("Please Enter Images of Product")
            setErrorOpen(true)
        }
    
        if(newProductError){
          setTitle(newProductError)
          setErrorOpen(true)

        }

        if(success){
          setTitle("Product Created Successfully")
          setSuccessOpen(true)

                navigate("/admin/dashboard")
                dispatch({type:NEW_PRODUCT_RESET})
        }
      }, [newProductError,dispatch,success,navigate])

  return (
    <Fragment>
    <MetaData title={`ADMIN - CREATE PRODUCT`} />
    {loading ? <Loader/> :
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form  className="createProductForm"  encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
            <h1>Create Product</h1>
                <div>
                    <SpellcheckIcon/>
                    <input 
                    type="text"  
                    placeholder='Product Name'
                    required
                    value={name}
                    id='name'
                    onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>
                <div >
                    <CurrencyRupeeIcon/>
                    <input 
                    type="number"  
                    placeholder='Price'
                    required
                    value={price}
                    id='price'

                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <DescriptionIcon/>
                    <textarea 
                    placeholder='Product Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                     cols="30"
                      rows="2"
                      required
                      id='description'
                      ></textarea>
                </div>
                <div>
                <AccountTreeIcon/>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                        <option key={cate.category} value={cate.category}>{cate.category}</option>
                    ))}
                </select>
                </div>
                <div >
                    <StorageIcon/>
                    <input 
                    type="StorageIcon"  
                    placeholder='Stock'
                    required
                    value={stock}
                    id='stock'

                    onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div id='createProductFormFile'>
                    <input 
                    type="file" 
                    id='avatar'
                    accept='image/*'
                    multiple
                    onChange={createProductImagesChange}
                    />
                </div>
                <div id='createProductFormImage'>
                    {imagesPreview.map((image,index) => (
                        <img key={index} src={image} alt="AAvatar Preview" />
                    ))}
                </div>
                <Button
                 id='createProductBtn'
                 type="submit"
                 disabled={loading ?  true : false}
                >
                Create
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

export default NewProduct