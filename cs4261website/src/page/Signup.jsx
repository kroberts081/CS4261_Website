import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { database } from '../firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { TextField, Button, Box, Typography, Avatar, Container, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Signup = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [userRole, setUserRole] = useState("Student");

    const rolesRef = collection(database, "UserRoles");
  
    const onSubmit = async (e) => {
      e.preventDefault()

      if (password1 == password2) {
        createUserWithEmailAndPassword(auth, email, password1)
        .then((user) => {
          addRole();
          navigate("/login");
        })
        .catch((error) => {
          alert("Passwords must contain: \n  - At Least 6 Characters \n  - One Uppercase Character");
        })
      } else {
        setPassword2(null);
        alert("Passwords don't match");
      }
    
    }

    const addRole = async () => {
        await setDoc(doc(database, "UserRoles", email), {
          email: email,
          role: userRole
        });
      }

  return (
    <Container maxWidth="sm">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 6,
        m: 3}}> 

        <Avatar sx={{ bgcolor: 'secondary.main',  width: 50, height: 50 }}>
          <PersonAddIcon/>
        </Avatar>

        <Typography variant="h5" component="div" sx={{mt:2}}>
          Create Account
        </Typography>

        <TextField id="email-address" size='medium' name="email" margin="normal" fullWidth label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
        <TextField id="password1" size='medium' type='password' margin="normal" fullWidth label="Password" variant="outlined" onChange={(e)=>setPassword1(e.target.value)}/>
        <TextField id="password2" size='medium' type='password' margin="normal" fullWidth label="Confirm Password" variant="outlined" onChange={(e)=>setPassword2(e.target.value)}/>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        m: 3}}>
          <Typography variant="h6">
            Please Select Account Type:
          </Typography>

          <RadioGroup defaultValue="student" name="radio-select" fullWidth>
            <FormControlLabel value="Student" control={<Radio />} label="Student" onChange={(e) => setUserRole(e.target.value)}/>
            <FormControlLabel value="Reviewer" control={<Radio />} label="Reviewer" onChange={(e) => setUserRole(e.target.value)} />
        </RadioGroup>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 6,
        m: 3}}>

        <Button variant='contained' type="submit" fullWidth sx={{ mt: 4}} onClick={onSubmit}> Create Account </Button>

        <Typography variant='body1' sx={{ mt: 4}}>
          <NavLink to="/login" className="underline text-tertiary"> Already have an account? Log In </NavLink>
        </Typography>

      </Box>
    </Container>
  )
}

export default Signup
