import React, {useState} from 'react';
import Text from '../components/elements/Text';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { database } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { getDoc, collection, where, query, doc, Firestore, getDocs, setDoc} from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import AppNav from '../components/AppNav';

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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'}}>
            <AppNav/>

            <Typography variant='h5' sx ={{ mt: 3}}>Add Essay Feedback</Typography>
            <Container  maxWidth="sm">
                <TextField id="feedback_notes" size='medium' multiline fullWidth margin="normal" label="Feedback Notes" variant="outlined" minRows={4} onChange={(e)=>setFeedbackNotes(e.target.value)}/>
                <TextField id="feedback_link" size='medium' fullWidth margin="normal" label="Link" variant="outlined" onChange={(e)=>setFeedback(e.target.value)}/>

                <Button variant='contained' onClick={addFeedback} sx={{ mt: 2}}>Submit Feedback</Button>
            </Container>
        </Box>
    )
}

export default Feedback