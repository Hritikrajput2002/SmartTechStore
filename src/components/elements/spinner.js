import React  from 'react'
import loading from '../../asset/spinner.gif'

const Spinner=()=>{
    return (
      <div style={{height:"90vh" ,width:"100%",display:"grid",placeItems:"center"}}>
           <img src={loading} alt="loading" style={{width:"100px"}}></img>
      </div>
    )
  }
  export default Spinner;

