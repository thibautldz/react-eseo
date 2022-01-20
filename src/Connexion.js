import { Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig  } from './firebase';


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Connexion = (props) => {

  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
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
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
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
    </Form>
  );
};

export default Connexion;