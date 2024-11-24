import {React,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './product.css'
import ReactStars from 'react-rating-stars-component'


const Product = (props) => {
    const option={
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      value: props.product.rating || 0,
      isHalf:true
    }

   
  return (
    <>
       <Link className="productlink" to={`http://localhost:3000/product/${props.product._id}`}>
            <img src={props.product.image[0].url}  width="100%" alt="product"/>
            <p>{props.product.name}</p>
            <div><ReactStars {...option} /><span>{`( ${props.product.totalreview}  Reviews )`}</span></div>
            <span>₹{props.product.price}</span>

       </Link>
    </>
  )
}

export default Product
