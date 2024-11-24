import {React,useContext,useEffect} from 'react'
import Navbar from '../navbar';
import Product from '../product/product';
import image from "../../asset/pro image.webp"
import MetaData from '../elements/metaData';
import noteContext from '../noteContext'
import Alert from '../elements/alert';
import Footer from '../footer/footer';
import Spinner from '../elements/spinner';
import './home.css'

const Home = () => {
  
  const context=useContext(noteContext)
  const {showProducts,alert,allproducts,isLoading}=context;
  

  useEffect(()=>{
      const fetchProducts = async () => {
        await showProducts();
      };
      fetchProducts();
    
    },[])

  return(
    <>
        <MetaData title={"Homepage"}/>
        <div className="homesection" > 
          <Navbar/>
         <Alert alert={alert} />

        { isLoading? ( <Spinner/> ) : 
              ( <div className='container productbox'>
                      <h2 className='proheading'>Features</h2>
                      <div className="productitems">
                        {allproducts && allproducts.map((product)=>{
                            return <Product  key={product._id} product={product}/>
                          })

                      }
                        
                      </div>
                      
                </div>
              )
          }  
              
        </div>
        <Footer/>
    </>

  )
   
}

export default Home;
