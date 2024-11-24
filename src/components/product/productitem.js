import {React,useEffect,useContext,useState} from 'react'
import Carousel from '../elements/carousel'
import './product.css'
import noteContext from '../noteContext'
import { useParams } from 'react-router-dom';
import Spinner from '../elements/spinner';
import ReactStars from 'react-rating-stars-component'
import Addreview from './addreview';
import Alert from '../elements/alert';




const Productitem = (props) => {
    const context=useContext(noteContext)
    const {showproductdetail,isLoading,alert,addCart}=context;
    const {id}=useParams()
    const [quantity,setquantity]=useState(1)
    const[product,setproduct]=useState({})               //single product


    const option={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value: product.rating || 0,
        isHalf:true,
        size: Number(30)
      }
   


    const fetchproductdetail=async()=>{
      const productdata= await showproductdetail(id)
      setproduct(productdata)
      
    }


    const handleaddtocart=async()=>{
       await addCart(quantity,id)
    }

    useEffect(()=>{
        fetchproductdetail()
    },[alert])

  return (
    <>
        { isLoading ? (   <Spinner/> ) : (
            <div className="productitempage">
              <Alert alert={alert}/>
                <div className="productitembox container">
                      <div className="carouselbox">
                               <Carousel image={product.image}/>
                        
                      </div>
                      
                     <div className="productarea">
                          <div className="productname">
                                <h2>{product.name}</h2>
                                <span>Product  #{product._id}</span>
                          </div>
                          <div className="productrating">
                               <div><ReactStars {...option} /><span>{`( ${product.totalreview}  Reviews )`}</span></div>

                          </div>

                            <div className="productprice">
                                 ₹{product.price}
                            </div>
                            <div className="productorder">
                                  <div className="productcount">
                                        <button onClick={()=>{setquantity(quantity-1)}} disabled={ quantity==0} >-</button>
                                        <input type="numeric" value={quantity} readOnly />
                                        <button onClick={()=>{setquantity(quantity+1)}} >+</button>
                                  </div>
                                  <button className="productcart" onClick={handleaddtocart}>
                                        Add to Cart
                                  </button>

                            </div>
                            <div className="productstatus" >
                                 Status:<span style={{color:  product.stock>0 ? "green" :"red" ,fontWeight:"600",marginLeft:"5px"}}>{ product.stock>0 ? "InStock" : " Out of Stock"}</span> 
                            </div>
                            <div className="productdetails">
                                <h4>Description:</h4>
                                <p>{product.description}</p>
                                <Addreview id={id}/>
                            </div>

                    </div >
                </div>
                

                <div  className="productreview">
                      <h2>Reviews</h2>
                      <div className="reviewcontainer">
                        {
                            product.review && product.review[0] ? (
                                    product.review.map((review)=>{
                                        const option2={
                                            edit:false,
                                            color:"rgba(20,20,20,0.1)",
                                            activeColor:"tomato",
                                            value: review.rating || 0,
                                            isHalf:true,
                                            size: Number(15)
                                          }
                                          return (
                                                   <div key={review._id} className="reviewbox">
                                                        <img src='/images/randomprofile.png'></img>
                                                            <strong>{review.name}</strong>
                                                            <div><ReactStars {...option2} /></div>
                                                            <p style={{textAlign:"center"}}>{review.comment}</p>
                                                   </div>
                                                 )
                                    })
                            ) :  (
                                <p> Not Reviewed Yet</p> 
                            )
                        }

                      </div>
                </div>

            </div>
        )}
    </>
  )
}

export default Productitem
