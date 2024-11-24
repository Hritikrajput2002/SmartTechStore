import React, { useState,useContext } from 'react';
import noteContext from './noteContext';
import { Link,useNavigate } from 'react-router-dom';
import chatImage from '../asset/chat.png';
import Alert from './elements/alert';
import Setavatar from './setAvatar';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';



const Signup = (props) => {
    const context = useContext(noteContext);
    const {userSignup,alert,callalert}=context;
    const navigate= useNavigate();
    const [selectedimage,setimage]=useState('');
    const [node, setnode] = useState({ name: "", email: "", password: "", confirmpassword: "",avatar:{image_id:"sampltid",url:"/images/no profile.png"}});
    const [reload, setReload] = useState(false);

    const handleChange = (e) => {
        setnode({ ...node, [e.target.name]: e.target.value });
    };
    const handleimage = () => {
        setnode({ ...node,  avatar: {
            url: selectedimage, 
            image_id: selectedimage 
        }});
    };
   

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (node.password !== node.confirmpassword) return callalert("Invalid Password", "Passwords do not match");
        if (node.name.length < 4)  return callalert("Invalid Name", "Name should be at least 3 characters long");
        if (!node.avatar.url)      return callalert("Invalid image", "image failed");
        const value=await userSignup(node)
        if(value)  navigate('/login')

        
    };

    return (
        <>
            <div className='p-2 text-white' style={{ height: '100vh', background: "#062147" }}>
                <Alert alert={alert} />
                <div className="container mt-5" style={{ width: "500px", background: "#2b4261", padding: "20px", borderRadius: "10px" }}>
                    <div className="d-flex flex-row">
                        <img src={chatImage} width="70px" style={{ marginRight: "100px" }} alt="Chat" />
                        <h1 className="mt-2 ml-1 text-primary">Register</h1>
                    </div>
                    <form className='mt-4' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input type="text" className="form-control" onChange={handleChange} name="name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={handleChange} name="email" required id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={handleChange} name="password" required id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" onChange={handleChange} name="confirmpassword" required id="exampleInputPassword2" />
                        </div>

                        {/* Modal Trigger Button */}
                        <button type="button" className="btn btn-secondary mt-4 mx-auto d-block" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Set Avatar
                        </button>

                        {/* Modal */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content bg-danger-subtle ">
                                    <div className="modal-header-sm d-flex ">
                                        <h3 className="modal-title text-primary text-center  ms-2" id="exampleModalLabel">Choose Avatar</h3>
                                        <Button
                                                className='refreshbutton'
                                                startIcon={<RefreshIcon sx={{ ml:32, width: 30, height: 30 }} />}  // Add the refresh icon here
                                                onClick={() => {
                                                    setReload(true);
                                                }}
                                                >
                                        </Button>
                                    </div>
                                    <div className="modal-body-sm ">
                                        <Setavatar setimage={setimage} selectedimage={selectedimage}  reload={reload} setreload={setReload}/>
                                    </div>
                                    <div className="modal-footer-sm">
                                        <button type="button" className="btn btn-primary  mx-auto d-block mb-3"  onClick={handleimage} data-bs-dismiss="modal">Save Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary">Signup</button>
                            <span className="px-4 pt-3">Already have an account?<Link to="/login"><b>Login</b></Link></span>
                        </div>
                        
                    </form>
                </div>
                
            </div>
        </>
    );
};

export default Signup;
