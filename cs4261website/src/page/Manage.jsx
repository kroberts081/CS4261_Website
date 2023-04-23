import React, { useEffect, useState} from 'react';
import { database } from '../firebase';
import { getDoc, collection, where, query, doc, Firestore, getDocs } from 'firebase/firestore';
import EssayCard from '../components/EssayCard';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import Text from '../components/elements/Text';

const Manage = (props) => {
    const navigate = useNavigate();
    const [essayList, setEssayList] = useState([]);
    const [role,setRole]=useState([])
    console.log(role)
    //const role = "studnet";
    const email = localStorage.getItem("email")
    useEffect(() => {
        getRoles()
    }, [])
    

    //set true if it takes to long to get essays
 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300)
    }, [])

    useEffect(() => {
        getRoles()
        console.log("HELLO HERER IE RADGSHAIHDG")
        console.log(localStorage.getItem("role"))
        console.log(role)

        if (localStorage.getItem("role") == "student" || role == "Student") {
            console.log("student")
            getEssays(query(collection(database, "Essays"), where("student", "==", email)));
        } else {
            console.log("reviewer")
            navigate("/reviewersmanage")
            //getEssays(query(collection(database, "Essays"), where("reviewers", "array-contains", email)));
        }
    }, [])

    const getEssays = async (query) => {
        const querySnapshot = await getDocs(query);
        let arr = [];

        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });

        setEssayList(arr);
    }

    const getRoles = async () => {
        console.log("here")
        console.log("adahsfiuawegawdghaiusdhfiuashgdasg")
        console.log(email)
        try {
            const querySnapshot = await getDocs(query(collection(database, "UserRoles"), where("email", "==", email)))
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                console.log(doc.data().role)
                setRole(doc.data().role)
                localStorage.setItem("role", doc.data().role)
              });
            //.then((querySnapshot.forEach((doc)))=>{   
                //console.log(querySnapshot.docs)            
                //const newData = querySnapshot.docs
                    //.map((doc) => ({...doc.data(), id:doc.id }));
                    
                //setRole(newData[0].role);   
                //localStorage.setItem("role", newData[0].role)             

            //}
            console.log("try")
            console.log(role)
            console.log(localStorage.getItem("role"))
            //console.log(doc.data())
        } catch (e) {
            console.error("Error with feedback: ", e);
          }
    }

    return (
        <section>
            <Text>Manage Essays</Text>

            <div>
                    {
                        essayList?.map((essay,i)=>(
                            <p key={i}>
                                <Text>Essay Name: </Text>
                                {essay.essay}
                                <Text>Essay Due Date: </Text>
                                {essay.due}
                                <Text>Essay Reviewers: </Text>
                                {essay.reviewers}
                                <Text>Essay Link: </Text>
                                {essay.link}
                                <Text>Essay Feedback: </Text>
                                {essay.feedback}
                                <Text>Essay Progress: </Text>
                                {essay.progress}
                            </p>
                        ))
                    }
                </div>

        </section>
    )
}

export default Manage