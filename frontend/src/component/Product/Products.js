import React, { Fragment, useEffect,useState } from 'react'
import "../Home/Home.css"
import MetaData from '../layout/MetaData'
import {getProduct} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux"
import Loader from "../layout/Loader/Loader"
import ProductCard from '../Home/ProductCard'
import { getAllCategories } from '../../actions/categoriesAction'
import { Typography, Slider } from "@mui/material";

const Products = () => {

    const dispatch = useDispatch()
    const { loading, error, products } = useSelector((state) => state.products);
    const {categories } = useSelector((state) => state.categories);
    
    const [keyword, setKeyword] = useState();
    const [category, setCategory] = useState("All Products");
    const [rating, setRating] = useState(0);
    const [price, setPrice] = useState([0, 100000]);
   
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
    
      const filterProducts = products.filter((item) =>
        item.price >= price[0] &&
        item.price <= price[1] &&
        item.category ===
          (category === "All Products" ? item.category : category) &&
        item.ratings >= rating )

    useEffect(() => {
       dispatch(getAllCategories())
        dispatch(getProduct())
    }, [dispatch, error])
    
  return (
    
<Fragment>

    {loading ? <Loader/>: <Fragment>
    <MetaData title={`ECOMMERCE - ALL PRODUCTS`}/>
    
    <h2 className="homeHeading" id="featuredProducts">{keyword  ?  `You searched for ${keyword}` : category}</h2>
    <div className='homeContainer'>
    <div className="filterBox ">
    <input className='searchBox' type="text" placeholder='Search a Product...' value={keyword} onChange={(e)=> setKeyword(e.target.value)}/>
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={100000}
        />
        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((cate) => [
            <li
              className="categoryLink"
              key={cate.category}
              onClick={() => {
                setCategory(cate.category);
                setKeyword("")
              }}
            >
              {cate.category}
            </li>,
          ])}
        </ul>
        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={rating}
            onChange={(e, newRating) => {
              setRating(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>
        <button className='clearFilter'  onClick={() => {
                setCategory('All Products');
                setKeyword("")
                setPrice([0, 100000])
                setRating(0)
              }} >Clear Filters</button>
      </div>
    <div className="container  " >
    {/* <div className="container  flexCenterRow" > */}
       {/* {
           products && products.map(product =>(
            <ProductCard key={product._id} product={product}/>
        ))
       } */}
        {filterProducts &&
              filterProducts.filter((item)=>
              item.name.toLowerCase().includes(keyword ? keyword.toLowerCase() : item.name.toLowerCase() )
              ).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
    </div>
    </div>

    
</Fragment>  }
</Fragment>
)
}

export default Products