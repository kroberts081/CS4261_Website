import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { collection, addDoc, setDoc, doc, query, where, getDoc } from 'firebase/firestore';

const EssayCard = (props) => {
    const [currentProgress, setCurrentProgress] = useState();
    const [days,setDays] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [stage, setStage] = useState();
    const [ready, setReady] = useState(false);
  
    useEffect(() => {
      if (props.role == "reviewer") {
        getFeedback();
      }
      setTimeout(() => {
        setReady(true);
      }, 300)
      getDays();
    }, [])
  
    let p;
    const getFeedback = async () => {
      let id = props.essay.essay + ":" + props.reviewer;
      const docRef = doc(database, "Feedback", id);
      const snapShot = await getDoc(docRef);
  
      if (!snapShot.exists()) {
        return;
      }
  
      setStage(snapShot.data().progress);
    }
  
    //gets the amount of days that have passed since the essay has been assigned
    const getDays = () => {
      let date1 = new Date(String(props.essay.due));
      let date2 = new Date();
      
      let time_diff = date1.getTime() - date2.getTime();
      let day_diff = Math.floor(time_diff / (1000 * 3600 * 24));
  
      setDays(day_diff)
    }
  
    //opens up the feedback/essay link 
    const viewEssay = async (type) => {
      let link;
      if (type == "essay") {
        link = props.essay.link;
      } else if (props.role == "reviewer") {
        setOpenModal(true);
        return;
      } else if (props.role == "student" && type == "feedback"){
        setOpenModal2(true);
        return;
      }
      //const result = await Linking.canOpenURL(link);
  
      //if (result) {
      //  await Linking.openURL(link);
      //} else {
      //  alert("Link Provided Is Bad");
      //}
    }
  
    //TODO: Fix Card Layout (react-nativepaper), Add Scrolling View
    return (
        <section></section>
    )
  }
  
  export default EssayCard