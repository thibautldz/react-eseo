import { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig  } from './firebase';
import { addDoc, setDoc, collection, query, getDocs} from "firebase/firestore";
import { getFirestore } from '@firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Home = () => {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        });
        const[loading, setLoading] = useState(true);
        const[details, setDetails] = useState([]);

        const userData = async () => {
            const q = query(collection(db,"users"));

            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log(data);
        };

    return (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <p>{user?.email}</p>
          <p>{user?.uid}</p>
        </Form>
      );
    };
    export default Home;