import React from 'react'
import { useState } from 'react';

const Carousel = (props) => {
  return (
    <>
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
                <div className="carousel-inner">
                  {
                    props.image && props.image.map((image)=>{
                        return  <div className="carousel-item active" key={image._id}>
                                     <img  src={image.url} className="carouselimg"  alt="image"/>
                                </div>
                    })
                  }
                    
                    
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-secondary rounded-circle" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-secondary rounded-circle" aria-hidden="true"></span>
                    <span className="visually-hidden ">Next</span>
                </button>
        </div>
    </>
  )
}

export default Carousel;
