import * as React from 'react';
import './profile.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useContext } from 'react';
import noteContext from '../noteContext';
import Alert from '../elements/alert';
import Divider from '@mui/material/Divider';


const Changepassword = () => {
  const [open, setOpen] = useState(false);  // Main profile modal
  const context = useContext(noteContext);
  const { updatePassword, callalert } = context;
  const [node, setNode] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNode({ ...node, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (node.newpassword.length < 4  ) return callalert("Invalid Name", "password should be at least 3 characters long");

    const value = await updatePassword(node);
    setOpen(false);
  };

  return (
    <div className="changepass">
        <button className="changepassword" onClick={handleOpen}>Change password</button>
      
      {/* Main Profile Modal */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="change-password-modal-title"
        aria-describedby="change-password-modal-description"
      >
        <Box className="container mt-5 editprofilemodal" sx={{ backgroundColor: 'white', p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>Change password</Typography>
          <Divider sx={{ borderBottomWidth: 2, borderColor: 'gray' }} />
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                name="oldpassword"
                value={node.oldpassword}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                name="newpassword"
                value={node.newpassword}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                name="confirmpassword"
                value={node.confirmpassword}
              />
            </div>
        

            <div className="mt-4">
              <Button variant="contained" type="submit" className="btn btn-primary">
                Update Password
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Changepassword;
