import { Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig  } from './firebase';
import { addDoc, setDoc } from "firebase/firestore";
import { getFirestore } from '@firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Inscription = (props) => {

  const [state, setState] = useState({
      name:"",
      firstName: "",
      age: "",
      email: ""
  })

  const onFinish = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((credentials) => {
const docRef =  addDoc(setDoc(db, "users"), {
    name: values.nom,
    prenom: values.prenom,
}).then(credentials);

console.log("Document written with ID: ", docRef.id);
    })
    .catch((err) => {
      message.error(err.message)
    })
  };

  const onFinishFailed = (values) => {}

  const label = [
    {
        name: "nom",
        title: "Nom",
    },
    {
        name: "prenom",
        title: "Prenom",
    },
    {
      name: "email",
      title: "Email",
  },
]

  const createMenuItem=(label) => {
    return (
        <Form.Item 
        label = {label.title} name = {label.name} 
        rules={[
            {
              required: true,
            },]}>
                 <Input />
        </Form.Item>
    )
  }

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
    {
        label.map((label) => createMenuItem(label))
        
    }
    <Form.Item 
        label = {"Password"} name = {"password"} 
        rules={[
            {
              required: true,
            },]}>
                 <Input.Password />
        </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Inscription
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Inscription;