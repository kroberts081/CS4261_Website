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
                    <form onSubmit={onSubmit} >                    
                        <div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                Email address
                                </label>
                                <input
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}                                    
                                    required
                                    placeholder="Email address"                                
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword1(e.target.value)}                                    
                                    required
                                    placeholder="Password"                                
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    label="Confirm password"
                                    value={password}
                                    onChange={(e) => setPassword2(e.target.value)}                                    
                                    required
                                    placeholder="Confirm Password"                                
                                />
                            </div>

                            <div>
                                <input type="radio" value="Student" 
                                onChange={(e) => setUserRole(e.target.value)}/> Student
                                <input type="radio" value="Reviewer"
                                onChange={(e) => setUserRole(e.target.value)} /> Reviewer
                            </div>
                        </div>                        

                        <div>
                            <button
                                type="submit"                                                               
                            >   
                                Sign up                                                             
                            </button>
                        </div>
                                             
                    </form>
                   

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
