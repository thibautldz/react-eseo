import { Form, Input, Button, message, Typography } from 'antd';
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
const { Title } = Typography;

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
        span: 8,
      }}
      autoComplete="off"
    >
      <Title level={5}>{user?.email}</Title>
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
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Connexion;