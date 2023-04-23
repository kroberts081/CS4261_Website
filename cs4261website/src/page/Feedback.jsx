import React, {useState} from 'react';
import Text from '../components/elements/Text';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { database } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { getDoc, collection, where, query, doc, Firestore, getDocs, setDoc} from 'firebase/firestore';

const Feedback = () => {
    const navigate = useNavigate();

    const [student, setStudent] = useState('');
    //const [essay, setEssay] = useState('');
    const [feedback, setFeedback] = useState();
    const [feedbackSent, setFeedbackSent] = useState(false);   
    const [feedbackNotes, setFeedbackNotes] = useState("");  
    
    const email = localStorage.getItem("revieweremail")
    const essay = localStorage.getItem("revieweressay")
    console.log(email)
    console.log(essay)
       

    const addFeedback = async () => {
        if (!feedback) {
            alert("Feedback link is required");
            return;
        }
        // getEssays(query(collection(database, "Essays"), where("student", "==", student), where("essay", "==", essay)));
        let id = essay + ":" + email
        try {
            await setDoc(doc(database, "Feedback", id), {
                essayName: essay,
                student: student,
                feedbackLink: feedback,
                feedbackNotes: feedbackNotes,
                reviewer: email
            });
        } catch (e) {
            console.error("Error with feedback: ", e);
          }
        

        setFeedbackSent(true);

        navigate("/reviewersmanage")
    }

    return(
        <>
            <main >        
                <section>
                    <Text>Give Feedback</Text>
                    <div>
                    <input
                        type="text" id = "feedback"
                        placeholder="Feedback Notes?"
                        onChange={(e)=>setFeedbackNotes(e.target.value)}
                    />
                    </div>
                    <div>
                    <input
                        type="text" id = "feedbacklink"
                        placeholder="Feedback Link?"
                        onChange={(e)=>setFeedback(e.target.value)}
                    />
                    </div>
                    <div className="btn-container">
                        <button
                        type="submit"
                        className="btn"
                        onClick={addFeedback}
                        >
                        Send Feedback 
                        </button>
                            </div>
                </section>
            </main>
        </>
    )
}

export default Feedback