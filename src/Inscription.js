import { Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig  } from './firebase';
import { LoadingOutlined } from '@ant-design/icons';
import { addDoc, setDoc } from "firebase/firestore"; 
import { getFirestore } from '@firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

const Inscription = (props) => {

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
      name:"",
      firstName: "",
      age: "",
      email: ""
  })

  const onFinish = (values) => {
    setLoading(<LoadingOutlined/>)
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((credentials) => {
      console.log(credentials)
      setLoading(true)
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
        name: "email",
        title: "mail",
    },
    {
        name: "password",
        title: "password",
    },
    {
        name: "nom",
        title: "nom",
    },
    {
        name: "prenom",
        title: "prenom",
    },
]

  const createMenuItem=(label) => {
    return (
        <Form.Item 
        label = {label.title} name = {label.name} 
        rules={[
            {
              required: true,
              message: 'Please input !',
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