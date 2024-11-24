import { React,useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import noteContext from '../noteContext';
import './profile.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import Alert from '../elements/alert';

const Cart = () => {
    
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { isLogined, userdetails,showCart,showproductdetail,editCart,alert } = context;
    const [change, setchange] = useState(false);
    const [user, setuser] = useState("");
    const[cartproduct,setcartproducts]=useState([]);
    const[grandtotal,setgrandtotal]=useState(0);




      
    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await isLogined();
                if (loggedIn) {
                    const fetchcartitem = async () => {
                      setchange(false)
                      const cartData = await showCart();
                      if (cartData) {
                        const productPromises = cartData.map(async (cart) => {
                            const product = await showproductdetail(cart.productid);
                            product.quantity = cart.quantity;
                            return product;
                        });
                        
                        const products = await Promise.all(productPromises);
                        setcartproducts(products);
                      }
                    
                    }
                    fetchcartitem()
                }
        
        }
        checkLoginStatus();
           
    }, [change]);

    useEffect(() => {
      let total = 0;
      cartproduct.forEach(product => {
          total += Number(product.quantity) * Number(product.price);
      });
      setgrandtotal(total);
  }, [cartproduct]);

  return (
    <> 
      <div className='profilemain'>
        <div className="homelink navbar" style={{boxShadow:" gray 3px 5px 3px"}}>
              <div className="fs-1 ms-5 mt-1 fw-medium d-flex align-items-center">
              <ListItemIcon style={{ minWidth: '30px', padding: 2 }}>
                  <ShoppingCartIcon fontSize="large" />              
              </ListItemIcon>
                    <div className=' text-secondary mb-2'>Cart</div>
              </div>
              
              <Link to="/">
                        <ListItemIcon style={{ minWidth: '30px', padding: 0 }}>
                          <HomeIcon  />
                        </ListItemIcon>
                       Home
             </Link>
        </div>
        <div className="cartmain d-flex">
             <div className="cartitemscontainer">
                       <div className="d-flex cartitemheader">
                            <h5 className='cartitemheaderProduct'>Product</h5>
                            <h5 className='cartitemheaderQuantity'>Quantity</h5>
                            <h5 className='cartitemheaderSubtotal'>Subtotal</h5>
                      </div>
                      {
                          cartproduct && cartproduct.length ? (
                            cartproduct.map((product,index) => (
                              <div key={product._id} className="cartitem ">
                                    <div className="cartitembox   d-flex">  
                                            <img src={product.image[0].url} width="120px"></img>
                                            <div className="cartitemdesc">
                                                  <h5>{product.name}</h5>
                                                  <p>Price:₹{product.price}</p> 
                                                  <button className='bg-secondary text-white' 
                                                          onClick={()=>{editCart(0,product._id)
                                                            setchange(true)
                                                  }}>Remove</button>
                                            </div>
                                      
                              
                                          <div className="productcount">
                                              <button  onClick={()=>{editCart(product.quantity-1,product._id)
                                                                    setchange(true)
                                                      }} 
                                                      disabled={ product.quantity===0} >-
                                              </button>
                                              <input type="numeric" value={product.quantity} readOnly />
                                              <button onClick={()=>{editCart(product.quantity+1,product._id)
                                                                    setchange(true)
                                                      }} >+
                                              </button>
                                          </div>
                                          <div className="cartitemtprice">
                                          ₹{product.price*product.quantity}
                                          </div>
                                    </div>
                              </div>
                              
                                    
                              
                            ))
                          ) : (
                            <div className="cardnoitem">No items found</div>
                          )
                      }
              </div>


              {
                  cartproduct && cartproduct.length ? (
                  <div className='pricetotalbox'>
                            <div className="priceboxheading"><h5>Price</h5></div>
                            <div className='priceitems'>
                                <div className='priceboxvalue'>
                                 <h5 className='cartitemheaderProduct'>Grand Total </h5>
                                 <h5 className='cartpriceheaderSubtotal'>₹{grandtotal}</h5>
                                </div> 
                            </div>
                            <button type="button" className='btn btn-secondary ' style={{marginTop:"12vh", marginLeft:"3vh"}}>Checkout</button>    
                  </div>
                  ) : (
                    <div></div>
                  )
              } 
        </div>      
       
        
      </div> 
    </>
  )
}

export default Cart



