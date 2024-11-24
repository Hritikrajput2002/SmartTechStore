import {React,useContext,useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useParams } from 'react-router-dom'
import Navbar from '../navbar';
import Product from './product';
import MetaData from '../elements/metaData';
import noteContext from '../noteContext';
import Alert from '../elements/alert';
import Spinner from '../elements/spinner';
import Pagination from '../elements/pagination';
import './product.css'


const SearchProduct = () => {
     const {keyword}=useParams();
     const context=useContext(noteContext)
     const {showProducts,alert,allproducts,isLoading,result}=context;

    const [price, setprice] = useState([10000, 160000]);
    const [rating,setrating]=useState(0)
    const [currentpage,setpage]=useState(1);
    const [category,setcategory]=useState("");
    const categories=["Smartphone","Tablet","Laptop","Featurephone","Flagship"]
    

    



  
    useEffect(() => {
        setpage(1);   // Reset the page to 1 when keyword changes
    }, [keyword,price,category,rating]);

    useEffect(()=>{
      const fetchProducts = async () => {
        await showProducts(keyword,currentpage,price,category,rating);
      };
      fetchProducts();
    
    },[keyword,currentpage,price,category,rating])

  return (
    <> 
            <MetaData title={"Product"}/>
        <div className="homesection" > 
          <Navbar/>
         <Alert alert={alert} />

        { isLoading? ( <Spinner/> ) : 
              ( <div className='container productbox'>
                      <h2 className='proheading'>Products</h2>
                      <div className="productitems">
                        {allproducts && allproducts.map((product)=>{
                            return <Product  key={product._id} product={product}/>
                          })
                        }
                      </div>
                </div>
              )
        }

        {
          result.pagesize < result.totalresult && <div className="pagination"><Pagination result={result} setpage={setpage} currentpage={currentpage} /> </div> 
        }
                
        <div className='filter'>
            <div className="pricefilter">
                  <Box sx={{ width: 150 }}>Price
                    <Slider
                      size="small"
                      value={price}
                      onChange={(event, newPrice) =>{setprice(newPrice) }}
                      valueLabelDisplay="auto"
                      aria-labelledby='range-slider'
                      min={0}
                      max={200000}
                    />
                  </Box>
            </div>
            <div className='categoryfilter'><p>Category</p>
                  <select onChange={(e)=>{setcategory(e.target.value)}} className="form-select form-select-sm " aria-label="Small select example">
                    <option value="">{category === "" ? "Select Category" : "Unselect"}</option>
                    {
                      categories && categories.map((category)=>{
                         return <option value={category} key={category}>{category}</option>
                      })
                    }
                  </select>
            </div>
            <div className='ratingfilter'><p>Rating</p>
                  <Slider
                    defaultValue={1}
                    value={rating}
                    onChange={(event,newRating)=>{setrating(newRating)}}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={5}
                  />
            </div>
        </div>
  
                
        </div>
    </>
  )
}

export default SearchProduct


