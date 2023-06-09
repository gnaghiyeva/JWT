import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserContext } from '../context/UserContext';
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const [user,setUser] = useUserContext()
    const navigate = useNavigate();
  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Auth+JWT
          </Typography>
          {user ? (
            <>
              <Button color="inherit">
                {user.username}
              </Button>
              <Button onClick={async()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                await setUser(null);
                navigate('/login');
              }} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/login">Login</Link>
              </Button>
              <Button color="inherit">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar