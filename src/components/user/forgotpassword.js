import React, { useState,useEffect,useContext } from 'react';
import  { Link ,useNavigate} from 'react-router-dom';
import Alert from '../elements/alert';
import noteContext from '../noteContext';
import chatImage from '../../asset/chat.png';


const Forgotpassword = () => {
    const context=useContext(noteContext)
    const {alert,callalert,forgotPassword,isLogined}=context;
    const navigate=useNavigate();
    const [email, setemail] = useState("");
  
    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await isLogined();
            if (loggedIn) {
                console.log("hi")
                navigate('/');
            }
        };
        checkLoginStatus();          
    }, []);


const handleChange = (e) => {
    setemail(e.target.value );
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if( forgotPassword(email))    console.log("forgot")//navigate('/')
};

return (
    <>
        <div className=' text-white' style={{ height: '100vh', background: "#062147",paddingTop:"15vh"}}>
            <Alert alert={alert} />
            <div className="container mt-5" style={{ width: "500px", background: "#2b4261", padding: "20px", borderRadius: "10px" }}>
                <div className="d-flex flex-row">
                    <img src={chatImage} width="70px" style={{ marginRight: "50px" }} alt="Chat" />
                    <h1 className="mt-2  text-primary mr-2">E-commerce  </h1>
                </div>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter e-mail" onChange={handleChange} name="email" required id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="btn btn-primary">Send Recovery Mail</button>
                        <span className="px-4">Create a new account?<Link to="/signup"><b>Signup</b></Link></span>
                    </div>
                </form>
            </div>
        </div>
    </>
);
};
export default Forgotpassword;
