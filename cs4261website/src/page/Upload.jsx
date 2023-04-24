import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import AppNav from '../components/AppNav';
import { Box, Container, TextField, Typography } from '@mui/material';


const Upload = (props) => {
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
                console.log("here")
                console.log(id)
                console.log(essayName)
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
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'}}>
        <AppNav/>
        <Typography variant='h5' sx ={{ mt: 3}}>Upload a Link to Your Essay</Typography>

        <Container maxWidth="sm">
            <TextField id="name" size='medium' fullWidth margin="normal" label="Essay Name" variant="outlined" onChange={(e)=>setEssayName(e.target.value)}/>
            <TextField id="revieweremail" size='medium' fullWidth margin="normal" label="Reviewer 1 Email" variant="outlined" onChange={(e)=>setReviewer1(e.target.value)}/>
            <TextField id="reviewer2email" size='medium' fullWidth margin="normal" label="(Optional) Reviewer 2 Email" variant="outlined" onChange={(e)=>setReviewer2(e.target.value)}/>
            <TextField id="reviewer3email" size='medium' fullWidth margin="normal" label="(Optional) Reviewer 3 Email" variant="outlined" onChange={(e)=>setReviewer3(e.target.value)}/>
            <TextField id="essayLink" size='medium' fullWidth margin="normal" label="Essay Link" variant="outlined" onChange={(e)=>setEssayLink(e.target.value)}/>
            <TextField id="duedate" size='medium' fullWidth margin="normal" label="Due Date (YYYY-MM-DD)" variant="outlined" onChange={(e)=>setDueDate(e.target.value)}/>

            <Button variant='contained' onClick={uploadEssay} sx={{ mt: 4}}>Upload Essay</Button>
        </Container>

    </Box>
  )
}

export default Upload


