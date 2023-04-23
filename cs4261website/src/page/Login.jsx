import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { TextField, Button, AppBar, Box, Icon, Typography, Avatar, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider, useTheme } from '@emotion/react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        console.log("hello")
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("email", email)
            localStorage.setItem("role", "Student")
            navigate("/manage")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
        
    }

    const onLoginReviewer = (e) => {
        console.log("hello")
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("email", email)
            localStorage.setItem("role", "Reviewer")
            navigate("/reviewersmanage")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
        
    }

    return(
            <Container maxWidth="sm">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 6,
                    m: 3}}> 

                    <Avatar sx={{ bgcolor: 'primary.main',  width: 50, height: 50 }}>
                        <LoginIcon/>
                    </Avatar>

                    <Typography variant="h5" component="div" sx={{mt:2}}>
                        Login
                    </Typography>

                    <TextField id="email-address" size='medium' name="email" margin="normal" fullWidth label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField id="password" size='medium' type='password' margin="normal" fullWidth label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>

                    <Button variant='contained' fullWidth onClick={onLogin} sx={{ mt: 4}}> Login as Student </Button>
                    <Button variant='contained' fullWidth onClick={onLoginReviewer} sx={{ mt: 4}}> Login as Reviewer </Button>
                    <Typography variant='body1' sx={{ mt: 4}}>
                        <NavLink to="/" className="underline text-tertiary"> No account yet? Sign up </NavLink>
                    </Typography>
                </Box>
            </Container>
    )
}

export default Login