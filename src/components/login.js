import React, { useState,useEffect,useContext } from 'react';
import  { Link ,useNavigate} from 'react-router-dom';
import chatImage from '../asset/chat.png';
import Alert from './elements/alert';
import noteContext from './noteContext';

const Login = () => {
    const context=useContext(noteContext)
    const {alert,callalert,userLogin,isLogined}=context;
    const navigate=useNavigate();
    const [node, setnode] = useState({email: "", password: ""});
  
    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await isLogined();
            if (loggedIn) {
                navigate('/');
            }
        };
        checkLoginStatus();          
    }, []);


const handleChange = (e) => {
    setnode({ ...node, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
     // Client-side validation
    if (node.password.length<4)   return callalert("Invalid Password", "Password should be more than length 4");
    if( userLogin(node)) navigate('/')
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
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={handleChange} name="password" required id="exampleInputPassword1" />
                        <span className='' style={{marginLeft:"45vh",paddingTop:"2vh"}}><Link to="/forgot"><b>Forgot password</b></Link></span>
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <span className="px-4">Create a new account?<Link to="/signup"><b>Signup</b></Link></span>
                    </div>
                </form>
            </div>
        </div>
    </>
);
};
export default Login;
