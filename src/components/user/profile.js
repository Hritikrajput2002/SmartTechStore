import { React,useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import noteContext from '../noteContext';
import './profile.css'
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import Editprofile from './editprofile';
import Alert from '../elements/alert';
import Changepassword from './changepassword';

const Profile = () => {
    
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { isLogined, userdetails,alert } = context;
    const [logged, setLogged] = useState(false);
    const [user, setuser] = useState("");  
    useEffect(() => {
      const checkLoginStatus = async () => {
        const loggedIn = await isLogined();
        setLogged(loggedIn);
         console.log(loggedIn)
        if (loggedIn) {
          const userinfo = await userdetails();
            setuser(userinfo);
            console.log(userinfo)
        }
        else{
            navigate('/');
        }
      };
      checkLoginStatus();
    }, [isLogined]);
  return (
    <> 
      <div className='profilemain'>
        <div className="homelink navbar" style={{boxShadow:" gray 3px 5px 3px"}}>
              <div className="fs-1 ms-5 mt-2 fw-medium">My Profile</div>
              
              <Link to="/">
                        <ListItemIcon style={{minWidth:"25px"}}>
                          <HomeIcon  />
                        </ListItemIcon>
                       Home
             </Link>
        </div>
        <div className='containers d-flex'>
                <div className='profileleft'>
                <Alert alert={alert} />
                       <div className='profilepic'>
                         {user.avatar && user.avatar.url ? (
                            <img src={user.avatar.url} alt={`${user.name}'s avatar`} />
                          ) : (
                            <img src="/images/no profile.png" alt="No Profile"/>
                          )}
                        </div>
                       <Editprofile/>
                       
                </div>
                <div className='profileright'>
                       <div className="name">
                             <p>Full Name</p><span>{user.name}</span>
                       </div>
                       <div className="email">
                             <p>Email</p><span>{user.email}</span>
                       </div>
                       <div className="createdat">
                             <p>Created at</p><span>{new Date(user.createdAt).toLocaleDateString()}</span>
                       </div>
                       <div className='profilerightbuttons'>
                            <button className="orders">My Orders</button>
                            <Changepassword/>
                       </div>
                       
                </div>
        </div>
      </div> 
    </>
  )
}

export default Profile

