import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import noteContext from '../noteContext';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';

export default function AccountMenu() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { isLogined, userLogout, userdetails } = context;
  const [logged, setLogged] = useState(false);
  const [roleadmin, setRoleadmin] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLogined();
      setLogged(loggedIn);

      if (loggedIn) {
        const user = await userdetails();
        if (user.role === 'admin') {
          setRoleadmin(true);
        }
      }
    };
    checkLoginStatus();
  }, [isLogined]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await userLogout();
    setLogged(false);
    setRoleadmin(false);
    navigate('./');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: '200px',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {logged ? [
            roleadmin && (
                <MenuItem key="admin-dashboard" component={Link} to="http://localhost:3000/dashboard" onClick={handleClose}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
        ),
          <MenuItem key="profile" component={Link} to="http://localhost:3000/profile" onClick={handleClose}>
                <ListItemIcon>
                        <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                Profile
          </MenuItem>,
          <MenuItem key="orders" onClick={handleClose}>
            <ListItemIcon>
              <LocalMallIcon fontSize="small" />
            </ListItemIcon>
            Orders
          </MenuItem>,
          <MenuItem key="cart" component={Link} to="http://localhost:3000/cart"  onClick={handleClose}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          Cart
        </MenuItem>,
          <Divider key="divider" />,
          <MenuItem key="logout" onClick={()=>{ logout() 
                                                handleClose ()}}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ] : [
          <MenuItem key="login" component={Link} to="http://localhost:3000/login" onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>,
          <MenuItem key="signup" component={Link} to="http://localhost:3000/signup" onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Signup
          </MenuItem>
        ]}
      </Menu>
    </>
  );
}
