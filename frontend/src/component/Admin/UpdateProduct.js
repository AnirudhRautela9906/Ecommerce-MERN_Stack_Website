import React, { Fragment,useEffect ,useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {updateProduct,getProductDetails,} from "../../actions/productAction"
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import Loader from "../layout/Loader/Loader"
import {  UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {  useParams } from 'react-router-dom';
import NotFound from "../../component/layout/NotFound.js";
import { getAllCategories } from '../../actions/categoriesAction';
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";


const UpdateProduct = () => {
    const dispatch = useDispatch()
    const {error,product,loading}= useSelector(state => state.productDetails)
    const {updateError,isUpdated}= useSelector(state => state.productDelete)
    // let [name, setName] = useState(product.name)  
    // let [price, setPrice] = useState(product.price)  
    // let [description, setDescription] = useState(product.description)  
    // let [category, setCategory] = useState(product.category)  
    // let [stock, setStock] = useState(product.stock)  
    // let [images, setImages] = useState([])  
    // let [oldImages, setOldImages] = useState(product.images)  
    // let [imagesPreview, setImagesPreview] = useState([])  
    let [name, setName] = useState("")  
    let [price, setPrice] = useState(10000)  
    let [description, setDescription] = useState("")  
    let [category, setCategory] = useState("")  
    let [stock, setStock] = useState(1)  
    let [images, setImages] = useState([])  
    let [oldImages, setOldImages] = useState([])  
    let [imagesPreview, setImagesPreview] = useState([])  
    const {id} =useParams()

    const {categories} =  useSelector(state => state.categories)
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [title, setTitle] = useState("");

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

        dispatch(updateProduct(id,myForm))
      }

      const updateProductImagesChange = (e) =>{
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])
        setOldImages([])

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

       
        if(updateError === "Cannot read properties of undefined (reading 'length')"){
            setErrorOpen(true)
            setTitle("Please Enter Images of Product")
        }
    
        
      
        if(product && product._id !== id){
        dispatch(getProductDetails(id))

        }
         else{ setOldImages(product.images)
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setImagesPreview([])

        }
        // if(updateError || error){
        //       errorAlert(updateError || error,isCancelled)
        //        return ()=>{isCancelled = true}
        // }

        if(isUpdated){
            setSuccessOpen(true)
        setTitle("Product Updated Successfully")
          
                dispatch({type:UPDATE_PRODUCT_RESET})
            dispatch(getProductDetails(id))

        }
        

      }, [updateError,dispatch,error,isUpdated,id,product])
      if ( error ) {
        return <NotFound text={"Product Not Found"} />;
      }

  return (
    <Fragment>
    <MetaData title={`ADMIN - UPDATE PRODUCT`} />
    {loading ? <Loader/> :
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            
            <form  className="createProductForm"  encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
            <h1>Update Product</h1>
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
                    id='email'

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
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                    onChange={updateProductImagesChange}
                    />
                </div>
                <div id='createProductFormImage'>
                    {oldImages && oldImages.map((image,index) => (
                        <img key={index} src={image.url} alt="Product Preview" />
                    )) } 
                </div>
                <div id='updateProductFormImage'>
                    {imagesPreview.map((image,index) => (
                        <img key={index} src={image} alt="Product Preview" />
                    )) } 
                </div>
                <Button
                 id='createProductBtn'
                 type="submit"
                 disabled={loading ?  true : false}
                >
                Update
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

export default UpdateProduct