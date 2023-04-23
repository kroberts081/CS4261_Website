import React, { useEffect, useState} from 'react';
import { database } from '../firebase';
import { getDoc, collection, where, query, doc, Firestore, getDocs } from 'firebase/firestore';
import EssayCard from '../components/EssayCard';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

const Manage = (props) => {
    const [essayList, setEssayList] = useState([]);
    const role = "studnet";
    //set true if it takes to long to get essays
 
    const [loading, setLoading] = useState(true);

    const email = "testtesttest@test.com"
    const {state} = useLocation();
    if (state == null || state.email == null) {
        const email = ""
    } else {
        const email = state.email;
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300)
    }, [])

    useEffect(() => {
        if (role == "student") {
            getEssays(query(collection(database, "Essays"), where("student", "==", email)));
        } else {
            getEssays(query(collection(database, "Essays"), where("reviewers", "array-contains", email)));
        }
    }, [])
    useEffect(() => {
        console.log("hello")
        console.log(getRoles())
    }, [])
    

    const getEssays = async (query) => {
        const querySnapshot = await getDocs(query);
        let arr = [];

        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });

        setEssayList(arr);
        console.log(arr)
    }

    const getRoles = async () => {
        const querySnapshot = await getDocs(query(collection(database, "UserRoles"), where("email", "==", 'testtesttest@test.com')));
        let arr = [];

        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        console.log(querySnapshot)
        console.log(arr)
        return querySnapshot
    }

    return (
        <section></section>
    )
}

export default Manage