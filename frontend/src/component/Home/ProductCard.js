import {Link} from "react-router-dom"
import {
    Rating,
    Stack
  } from "@mui/material";



const ProductCard = ({product}) => {
    
  return (
<Link className="productCard" to={`/product/${product._id}`}>
<img src={product.images[0].url} alt="" />
   <div className="content"> <p>{product.name}</p>
    <div>
    <Stack>
        <Rating 
          value={product.ratings}
          readOnly
          style={{ color: "tomato" }}
          color=""
          precision={0.5}
        />
      </Stack><span>({product.numOfReviews} Reviews) </span>
    </div>
    <span>Rs {product.price} </span>
    </div>
</Link>
    )
}

export default ProductCard