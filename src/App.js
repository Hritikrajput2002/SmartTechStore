import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home/home.js';
//import Setavatar from './components/setAvatar';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import NoteState from "./components/noteState.js";
import Productitem from './components/product/productitem.js'
import SearchProduct from './components/product/searchproduct.js';
import Profile from './components/user/profile.js';
import Dashboard from './components/dashboard.js';
import Forgotpassword from './components/user/forgotpassword.js';
import Resetpassword from './components/user/resetpassword.js';
import Cart from './components/user/cart.js';


function App() {

  

  return (
    <>
      <NoteState>
           <Router>
          
                    <Routes>
                    <Route exact path="/" element={<Home/>}     />
                    <Route exact path="/product/:id" element={<Productitem/>}     />
                    <Route exact path="/searchproducts/:keyword" element={<SearchProduct/>}     />
                    <Route exact path="/searchproducts" element={<SearchProduct/>}     />

                    <Route exact path="/login" element={<Login/>}     />
                    <Route exact path="/signup"  element={<Signup/>}  />
                    <Route exact path="/profile" element={<Profile/>}     />
                    <Route exact path="/cart" element={<Cart/>}     />

                    <Route exact path="/forgot" element={<Forgotpassword/>}     />
                    <Route exact path="/resetpassword/:token" element={<Resetpassword/>}     />


                    <Route exact path="/dashboard" element={<Dashboard/>}     />
                    {/* <Route exact path="/Setavatar"  element={<Setavatar />}  /> */}
                    </Routes>
          </Router>
      </NoteState>
    
    </>
  );
}

export default App;
