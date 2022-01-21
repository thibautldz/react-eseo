import { Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword, 
  onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig  } from './firebase';
import 'antd/dist/antd.css'


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


const Connexion = (props) => {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser)
  })

  const onFinish = (values) => {
    const user = signInWithEmailAndPassword(auth, values.email, values.password)
    .then((props) => {return (<p> favoris </p>)})
    .then((credentials) => {
      console.log(credentials)
    })
    .catch((err) => {
      message.error(err.message)
    })
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      autoComplete="off"
    >
      <br />
      <br />
      <Form.Item
        label="mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
      </Form.Item>
      <p>{user?.email}</p>
      <p>{user?.uid}</p>
    </Form>
  );
};

export default Connexion;