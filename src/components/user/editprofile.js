import * as React from 'react';
import './profile.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useContext } from 'react';
import noteContext from '../noteContext';
import Alert from '../elements/alert';
import Setavatar from '../setAvatar';
import RefreshIcon from '@mui/icons-material/Refresh';
import Divider from '@mui/material/Divider';


const Editprofile = () => {
  const [open, setOpen] = useState(false);  // Main profile modal
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);  // Avatar modal
  const context = useContext(noteContext);
  const { updateProfile, callalert } = context;
  const [selectedImage, setImage] = useState('');
  const [reload, setReload] = useState(false);
  const [node, setNode] = useState({
    name: "",
    email: "",
    avatar: { image_id: "sampleid", url: "/images/no profile.png" }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNode({ ...node, [e.target.name]: e.target.value });
  };

  const handleImage = () => {
    setNode({
      ...node,
      avatar: {
        url: selectedImage,
        image_id: selectedImage
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (node.name.length < 4 && node.name.length>=1 ) return callalert("Invalid Name", "Name should be at least 3 characters long");

    const value = await updateProfile(node);
    setOpen(false);
  };

  return (
    <div className="editprofile">
      <Button variant="contained" className="editprofile" onClick={handleOpen}>Edit Profile</Button>
      
      {/* Main Profile Modal */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-modal-title"
        aria-describedby="edit-profile-modal-description"
      >
        <Box className="container mt-5 editprofilemodal" sx={{ backgroundColor: 'white', p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>Edit Profile</Typography>
          <Divider sx={{ borderBottomWidth: 2, borderColor: 'gray' }} />
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="name"
                value={node.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                name="email"
                value={node.email}
              />
            </div>

            {/* Button to trigger Avatar Modal */}
            <Button
              variant="outlined"
              className="btn btn-secondary mt-4 mx-auto d-block"
              onClick={() => setAvatarModalOpen(true)}
            >
              Set Avatar
            </Button>

            {/* Avatar Modal */}
            <Modal
              open={avatarModalOpen}
              onClose={() => setAvatarModalOpen(false)}
              aria-labelledby="choose-avatar-modal-title"
              aria-describedby="choose-avatar-modal-description"
            >
              <Box className="avatar-modal-content " sx={{ backgroundColor: '#e1e5eb', p: 4, width: 600, mx: 'auto', mt: 30 }}>
                <div className="modaltopcs">
                <Typography variant="h4" component="h2" id="choose-avatar-modal-title">
                  Choose Avatar
                </Typography>
                <Button
                        className='refreshbutton'
                        startIcon={<RefreshIcon sx={{ ml:32, width: 30, height: 30 }} />}  // Add the refresh icon here
                        onClick={() => {
                            setReload(true);
                        }}
                        >
                </Button>
                </div>
                
                <Divider sx={{ borderBottomWidth: 2, borderColor: 'gray' }} />
                <Setavatar setimage={setImage} selectedimage={selectedImage} reload={reload} setreload={setReload} />
                <Button
                  variant="contained"
                  sx={{ mt: 0 }}
                  onClick={() => {
                    handleImage();
                    setAvatarModalOpen(false);
                  }}
                >
                  Save Avatar
                </Button>
                
              </Box>
            </Modal>

            <div className="mt-4">
              <Button variant="contained" type="submit" className="btn btn-primary">
                Update Profile
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Editprofile;
