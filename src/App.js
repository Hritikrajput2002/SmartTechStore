import React from "react";
import Navbar from "./components/navbar";
import Home from "./components/home"
import Footer from "./components/footer/footer";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return ( 
      <Router>
  

            <Navbar/>
            <Home/>
            <Footer/>
          

  
      </Router>     
  );
}

export default App;
