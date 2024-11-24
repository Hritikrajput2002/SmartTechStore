import React from 'react'
import '../product/product.css'

const Pagination = (props) => {
    const { totalresult, pagesize } = props.result;
    const {currentpage,setpage}=props;
    const pageno = Math.ceil(totalresult / pagesize);
    const pageNumbers = [];
    for (let index = 1; index <= pageno; index++) {
        pageNumbers.push(index);
    }

  return (
    <>
       <nav aria-label="...">
            <ul className="pagination">
                <li className={`page-item ${currentpage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={()=>{setpage(currentpage-1)}}>Previous</button>
                </li>
                {
                     pageNumbers.map((number)=>{
                       return (
                                <li key={number} className={`page-item ${currentpage === number ? 'active' : ''}`}>
                                    <button className="page-link " onClick={()=>{props.setpage(number)}}> {number} </button>
                                </li>
                            )
                     })
                }  
                <li className={`page-item ${currentpage === pageno ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={()=>{setpage(currentpage +1)}} >Next</button>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Pagination
