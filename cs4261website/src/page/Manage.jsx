import React, { useEffect, useState} from 'react';
import { database } from '../firebase';
import { getDoc, collection, where, query, doc, Firestore, getDocs } from 'firebase/firestore';
import EssayCard from '../components/EssayCard';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import Text from '../components/elements/Text';

const Manage = (props) => {
    const [essayList, setEssayList] = useState([]);
    const [role,setRole]=useState([])
    //const role = "studnet";
    const email = localStorage.getItem("email")
    useEffect(() => {
        getRoles()
    })
    

    //set true if it takes to long to get essays
 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300)
    }, [])

    useEffect(() => {
        if (role == "student" || role == "Student") {
            console.log("am student")
            getEssays(query(collection(database, "Essays"), where("student", "==", email)));
        } else {
            getEssays(query(collection(database, "Essays"), where("reviewers", "array-contains", email)));
        }
    }, [])

    const getEssays = async (query) => {
        const querySnapshot = await getDocs(query);
        let arr = [];

        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });

        setEssayList(arr);
        console.log("HERE HELLO")
        console.log(arr)
    }

    const getRoles = async () => {
        const querySnapshot = await getDocs(query(collection(database, "UserRoles"), where("email", "==", email)))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setRole(newData[0].role);   
                localStorage.setItem("role", newData[0].role)             

            })

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