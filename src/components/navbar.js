import {React,useEffect,useContext,useState} from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom"; 
import noteContext from './noteContext';
import MenuPopupState from './elements/usermenu';



const Navbar = () => {
    const navigate=useNavigate();
    const context=useContext(noteContext)
    const {callalert,isLogined,userLogout}=context;
    const [keyword,setkeyword]=useState('')
    const location=useLocation();

     useEffect(()=>{
        
    },[])

     const searchproduct=()=>{
        navigate(`/searchproducts/${keyword.trim()}`)
     }

  return (
    <>
      
        <nav className="navbar navbar-expand-lg navbar-light bg-dark px-3 " style={{boxShadow:" gray 3px 5px 3px"}}>
            <Link className="navbar-brand text-primary" to="/">Smart TechStore</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active mx-2">
                        <Link className={`nav-link text-white ${location.pathname === "/" ? "fw-bold" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                        <Link className={`nav-link text-white ${location.pathname === "/about" ? "fw-bold" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown mx-2">
                        <Link className="nav-link dropdown-toggle text-white" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </Link>
                        <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/">Action</Link></li>
                            <li><Link className="dropdown-item" to="/">Another action</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                        </ul>
                        </li>
                        <li className="nav-item mx-2">
                        <Link className="nav-link disabled  text-white" to="/">Disabled</Link>
                        </li>
                </ul>
                <div className="d-flex ms-auto px-3" >
                    <input className="form-control me-2" type="search" onChange={(e)=>{setkeyword(e.target.value)}} placeholder="Products" aria-label="Search"/>
                    <button className="btn btn-outline-success"  onClick={searchproduct}>Search</button>
                </div>
               
                <MenuPopupState/>
            </div>
        </nav>
    </>
  )
}

export default Navbar;





                
               
