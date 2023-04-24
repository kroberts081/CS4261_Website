import { AppBar, Box, Button, Icon, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const AppNav = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // Handle Error
        });

    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Box sx={{marginRight:"auto"}}>
                  <Box sx={{flexDirection:"row", display:"flex", alignItems:"center"}}>
                    <Icon>
                        <HistoryEduIcon/>
                    </Icon>
                    <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                            College Application Help
                    </Typography>
                    </Box>
                </Box>
                <Box>
                    <Button sx={{ color: '#ffffff'}} component={NavLink} to={'/upload'}>Upload Essays</Button>
                    <Button sx={{ color: '#ffffff'}} component={NavLink} to={'/manage'}>Student Manage</Button>
                    <Button sx={{ color: '#ffffff'}} component={NavLink} to={'/reviewersmanage'}>Reviewer Manage</Button>
                    <Button sx={{ color: '#ffffff'}} component={NavLink} to={'/feedback'}>Feedback</Button>
                    <IconButton onClick={handleLogout} sx={{ color: '#ffffff'}}>
                        <LogoutIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
  }
  
  export default AppNav