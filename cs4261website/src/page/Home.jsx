import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/elements/Card';
import Text from '../components/elements/Text';
import Button from '@mui/material/Button';
import Time from '../components/widgets/Time';
import Settings from '../components/widgets/Settings';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'; 
import { collection, addDoc, setDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';


const Home = (props) => {
    const navigate = useNavigate();    
    const email = localStorage.getItem("email")
    
    const [essayName, setEssayName] = useState(); 
    const [reviewer1, setReviewer1] = useState();
    const [reviewer2, setReviewer2] = useState();
    const [reviewer3, setReviewer3] = useState();
    const [essayLink, setEssayLink] = useState();
    const [dueDate, setDueDate] = useState();
    const [uplaoded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);

    let date = new Date().toISOString().slice(0, 10);

    const uploadEssay = async (e) => {
        e.preventDefault();

        if (!essayName || (!reviewer1 && !reviewer2 && !reviewer3) || !essayLink) {
            alert("All fields are required")
            setLoading(false);
            return;
        }
        
        //due date needs error handling
        let reviewers = [];
        if (reviewer1) {
            reviewers.push(reviewer1);
        }
        if (reviewer2) {
            reviewers.push(reviewer2);
        }
        if (reviewer3) {
            reviewers.push(reviewer3);
        }
        console.log(dueDate)
        console.log(essayName)
        console.log(essayLink)
        console.log(email)
        console.log(reviewers)

        try {
            const refData = await addDoc(collection(database, "Essays"), {
                due: dueDate,
                essay: essayName,
                link: essayLink,
                progress: "",
                student: email,
                feedback: "",
                reviewers: reviewers
            });
            console.log("Document written with ID: ");
        } catch (e) {
            console.error("Error adding document: ", e);
          }
        

        setUploaded(true);
        setEssayName(null);
        setReviewer1(null);
        setReviewer2(null);
        setReviewer3(null);
        setEssayLink(null);
        setDueDate(null);

        try {
            reviewers.forEach(async (reviewer) => {
                let id = essayName + ":" + reviewer;
                await setDoc(doc(database, "Feedback", id), {
                    essayName: essayName,
                    feedbackLink: "",
                    feedbackNotes: "",
                    reviewer: reviewer,
                    student: email,
                    progress: "Received"
                })
            })
        } catch (e) {
            console.error("Error adding document: ", e);
          }
          var eName = document.getElementById("name") 
          eName.value = ""
          var r1 = document.getElementById("revieweremail") 
          r1.value = ""
          var r2 = document.getElementById("reviewer2email") 
          r2.value = ""
          var r3 = document.getElementById("reviewer3email") 
          r3.value = ""
          var eLink = document.getElementById("essayLink") 
          eLink.value = ""
          var dueDateR = document.getElementById("duedate") 
          dueDateR.value = ""
          
          alert("Successfully uploaded essay!")
          navigate("/manage")
    }

  return (
    <section className="upload-container">        
        <Text>Upload Essay</Text>
        <div>
   
            <div>
                <input
                    type="text" id = "name"
                        placeholder="Essay Name?"
                    onChange={(e)=>setEssayName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text" id = "revieweremail"
                        placeholder="Reviewer Email?"
                    onChange={(e)=>setReviewer1(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text" id = "reviewer2email"
                        placeholder=" Reviewer 2 Email (optional)"
                    onChange={(e)=>setReviewer2(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="text" id = "reviewer3email"
                        placeholder="Reviewer 3 Email (optional)"
                    onChange={(e)=>setReviewer3(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="text" id = "essayLink"
                        placeholder="Essay Link"
                    onChange={(e)=>setEssayLink(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text" id = "duedate"
                        placeholder="Due Date"
                    onChange={(e)=>setDueDate(e.target.value)}
                />
            </div>

        <div className="btn-container">
            <button
                type="submit"
                className="btn"
                onClick={uploadEssay}
            >
                Upload Essay
            </button>
        </div>
</div>
    </section>
  )
}

export default Home


