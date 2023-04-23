import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/elements/Card';
import Text from '../components/elements/Text';
import Button from '../components/elements/Button';
import Time from '../components/widgets/Time';
import Settings from '../components/widgets/Settings';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'; 
import { collection, addDoc, setDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate();
    
    const email = ""
    const {state} = useLocation();
    if (state == null || state.email == null) {
        const email = ""
    } else {
        const email = state.email;
    }
    
    //console.log(email)
    
    const [essayName, setEssayName] = useState(); 
    const [reviewer1, setReviewer1] = useState();
    const [reviewer2, setReviewer2] = useState();
    const [reviewer3, setReviewer3] = useState();
    const [essayLink, setEssayLink] = useState();
    const [dueDate, setDueDate] = useState();
    const [uplaoded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);

    let date = new Date().toISOString().slice(0, 10);

    const uploadEssay = async () => {
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
        console.log("hello")
        console.log(database)

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
        
        alert("got here")

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
          navigate("/home", { state: { email: email }})
    }

  return (
    <section className="text-white pt-10 pb-20">        
        <Text>Upload Essay</Text>
        <form onSubmit={uploadEssay}>
        <div>
                            <div>
                                <label htmlFor="essay-name" className="sr-only">
                                Essay Name
                                </label>
                                <input
                                    type="essayname"
                                    label="Essay Name"
                                    value={essayName}
                                    onChange={(e) => setEssayName(e.target.value)}                                    
                                    required
                                    placeholder="Essay Name"                                
                                />
                            </div>
                            <div>
                                <label htmlFor="reviewer-email" className="sr-only">
                                Reviewer Email
                                </label>
                                <input
                                    type="revieweremail"
                                    label="Reviewer Email"
                                    value={reviewer1}
                                    onChange={(e) => setReviewer1(e.target.value)}                                    
                                    required
                                    placeholder="Reviewer Name"                                
                                />
                            </div>
                            <div>
                                <label htmlFor="reviewer-email2" className="sr-only">
                                Reviewer 2 Email (optional)
                                </label>
                                <input
                                    type="revieweremail2"
                                    label="Reviewer Email"
                                    value={reviewer2}
                                    onChange={(e) => setReviewer2(e.target.value)}                                    
                                    placeholder="Reviewer Name"                                
                                />
                            </div>
                            <div>
                                <label htmlFor="reviewer-email3" className="sr-only">
                                Reviewer 3 Email (optional)
                                </label>
                                <input
                                    type="revieweremail3"
                                    label="Reviewer Email"
                                    value={reviewer3}
                                    onChange={(e) => setReviewer3(e.target.value)}                                    
                                    placeholder="Reviewer Name"                                
                                />
                            </div>
                            <div>
                                <label htmlFor="essay-link" className="sr-only">
                                Essay Link
                                </label>
                                <input
                                    type="essaylink"
                                    label="Essay Link"
                                    value={essayLink}
                                    onChange={(e) => setEssayLink(e.target.value)}                                    
                                    required
                                    placeholder="Essay Link"                                
                                />
                            </div>
                            <div>
                                <label htmlFor="due-date" className="sr-only">
                                Due Date (yyyy-mm-dd)
                                </label>
                                <input
                                    type="duedate"
                                    label="Due Date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}                                    
                                    required
                                    placeholder="Due Date (yyyy-mm-dd)"                                
                                />
                            </div>
                        </div>                        

                        <div>
                            <button
                                type="submit"                                                               
                            >   
                                Upload Essay                                                             
                            </button>
                        </div>
        </form>
        <div>
            <button onSubmit={navigate("/manage", { state: { email: email }})}>Manage Essays</button>
        </div>
    </section>
  )
}

export default Home


