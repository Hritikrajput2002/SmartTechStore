import * as React from 'react';
import '../user/profile.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useContext } from 'react';
import noteContext from '../noteContext';
import Alert from '../elements/alert';
import Divider from '@mui/material/Divider';
import ReactStars from 'react-rating-stars-component'



const Addreview = (props) => {
  const [open, setOpen] = useState(false);  // Main profile modal
  const context = useContext(noteContext);
  const { addReview, callalert } = context;
  const [node, setNode] = useState({
    name: "",
    rating: "",
    comment: "",
    id:props.id
  });

    const option={
      edit:true,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      value: node.rating || 0,
      size: Number(30),
      onChange: (newRating) => setNode({ ...node, rating: newRating }) 
    }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNode({ ...node, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (node.name.length < 3  ) return callalert("Invalid Name", "Name should be at least 3 characters long");

    const value = await addReview(node);
    setOpen(false);
  };

  return (
    <div className="changepass">
        <button className="submitreview pb-2" onClick={handleOpen}>Add Review</button>
      
      {/* Main Profile Modal */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="change-password-modal-title"
        aria-describedby="change-password-modal-description"
      >
        <Box className="container mt-5 editprofilemodal" sx={{ backgroundColor: 'white', p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>Add Review</Typography>
          <Divider sx={{ borderBottomWidth: 2, borderColor: 'gray' }} />
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={handleChange} name="name" required />
            </div>

            <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">Comment</label>
                    <input type="text" className="form-control" onChange={handleChange} name="comment" required />
            </div>
            <div className="productrating ">
              <label htmlFor="exampleInputDescription" className="form-label">Rating</label>
                <div><ReactStars {...option} /><span className=" text-danger fs-6 fw-semibold" style={{marginTop:"12px"}}>{`( ${node.rating} Stars )`}</span></div>
             </div>
        

            <div className="mt-4">
              <Button variant="contained" type="submit" className="btn btn-primary">
                Submit Review
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Addreview;
