import React, {useState} from 'react';
import Text from '../components/elements/Text';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import { database } from '../firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

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
    <main style={{
        backgroundColor: 'white'
      }}>        
        <section style={{
                backgroundColor: 'white'
              }}>
            <div className="App"
            style={{
                backgroundColor: 'white'
              }}>
                <div className="Signup">
                <div>
   
   <div>
       <input
           type="text" id = "email"
               placeholder="Email?"
           onChange={(e)=>setEmail(e.target.value)}
       />
   </div>
   <div>
       <input
           type="text" id = "password"
               placeholder="Password?"
           onChange={(e)=>setPassword1(e.target.value)}
       />
   </div>
   <div>
       <input
           type="text" id = "confirmpassword"
               placeholder="Confirm Password"
           onChange={(e)=>setPassword2(e.target.value)}
       />
   </div>
   <div>
                                <input type="radio" value="Student" 
                                onChange={(e) => setUserRole(e.target.value)}/> Student
                                <input type="radio" value="Reviewer"
                                onChange={(e) => setUserRole(e.target.value)} /> Reviewer
                            </div>

<div className="btn-container">
   <button
       type="submit"
       className="btn"
       onClick={onSubmit}
   >
       Sign Up
   </button>
</div>
</div>

                    <p className="text-sm text-white text-center">
                        Already have an account?{' '}
                        <NavLink to="/login" className="underline text-tertiary">
                            Sign in
                        </NavLink>
                    </p>
                    
                </div>
            </div>
        </section>
    </main>
  )
}

export default Signup
