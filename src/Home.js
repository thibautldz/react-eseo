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
const db = getFirestore();

const Home = () => {
      let [userfirestore, setUserF] = useState();
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        });
        let uid = user.uid;
        const userData = async () => {
            const querySnapshot = await getDocs(collection(db,"users"));
            querySnapshot.forEach((doc) => {
              if(uid != null )
              {
                uid = '"' + uid + '"';
                if(uid === doc.data().credentials){
                  const userData = doc.data();
                  setUserF(userData);
                }
              }
            });
        };
        
        useEffect(() => {
          userData();
          console.log(userfirestore);
        },[]);
        //const arrayfavoris = userfirestore.favoris; 
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