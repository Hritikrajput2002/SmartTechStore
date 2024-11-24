import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <> 
        <div className="d-flex justify-content-center ">
        <div className="footer container">
            <div className="footerid1">
                       <div>
                            <h2>Customer Service</h2>
                            <p>FAQ</p>
                            <p>Return and refunds</p>
                            <p>Terms and conditions</p>
                            <p>Privacy Policy</p>
                       </div>
            </div>
            <div className="footerid1">
                        <div>
                            <h2>Stores</h2>
                            <p>Stores location</p>
                            <p>Store hours</p>
                            <p>Store events</p>
                            <p>Store support</p>
                       </div>
            </div>
            <div className="footerid1">
            <div>
                            <h2>About us</h2>
                            <p>Our story</p>
                            <p>Career with Ecommerce</p>
                            <p>News</p>
                       </div>
            </div>
            <div className="footerid1">
                       <h2>Follow us</h2>
                       <div className="d-flex gap-3">
                            <p>facebook</p>
                            <p>twitter</p>
                            <p>instagram</p>
                       </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Footer
