import React, { useState,useEffect,useContext } from 'react';
import  { Link ,useNavigate,useParams} from 'react-router-dom';
import Alert from '../elements/alert';
import noteContext from '../noteContext';
import chatImage from '../../asset/chat.png';


const Resetpassword = () => {
    const {token}=useParams();
    const context=useContext(noteContext)
    const {alert,callalert,resetPassword,isLogined}=context;
    const [node, setnode] = useState({password: "",confirmpassword: "",token:""});
    const navigate=useNavigate();
  
    useEffect(() => {
        setnode({ ...node, token:token });
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
    setnode({ ...node, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if( resetPassword(node)) {

       console.log("reset")
       navigate('/login')
    }
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
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={handleChange} name="password" required id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" onChange={handleChange} name="confirmpassword" required id="exampleInputPassword2" />
                        </div>
                    <div className="mt-5">
                        <button type="submit" className="btn btn-primary">Reset Password</button>
                        <span className="px-4">Create a new account?<Link to="/signup"><b>Signup</b></Link></span>
                    </div>
                </form>
            </div>
        </div>
    </>
);
};
export default Resetpassword;
