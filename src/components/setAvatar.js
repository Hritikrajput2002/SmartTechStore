import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Setavatar = (props) => {
      const [avatars, setAvatars] = useState([]);
      const navigate= useNavigate();

      const fetchAvatars = async () => {
        try {
          const avatarUrls = [];
          for (let i = 0; i < 5; i++) {
            const randomId = Math.floor(Math.random() * 1000);
            const avatarUrl= `https://api.multiavatar.com/${randomId}.png?apikey=m8tEFp9JIXCSJA`;
            avatarUrls.push(avatarUrl);
          }
          setAvatars(avatarUrls);
        } 
        catch (error) {
          console.error('Error fetching avatars:', error);
        }
      }

    const selecthandle=(avatarUrl)=>{
              props.setimage(avatarUrl);
            
    }
  

  useEffect(() => {
    props.setreload(false);
    fetchAvatars();
  }, [props.reload]); // Run fetchAvatars only once on component mount

  return (
    <>
          <div className="d-flex flex-column justify-content-center ">
              {avatars.length > 0 && ( // Render only if avatars are fetched successfully
                <ul className="d-flex justify-content-center" >
                  {avatars.map((avatarUrl, index) => (
                    <li key={index} style={{listStyleType:'none',display:'inline-block'}}>
                      <img src={avatarUrl}  onClick={()=>{selecthandle(avatarUrl)}}  style={{width:"60px",margin:"20px",borderRadius:"50%",border:props.selectedimage ===avatarUrl ?  '4px solid blue': null}}   alt={`Avatar ${index + 1}`} />
                    </li>

                  ))}
                </ul>
              )}

          </div>
    </>
  );
};

export default Setavatar;
