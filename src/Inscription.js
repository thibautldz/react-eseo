import { Form, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import { doc, addDoc, setDoc, collection } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Inscription = (props) => {
  const [state, setState] = useState();

  const onFinish = (values) => {
    //RÃ©cupÃ©rer le pass et le mail dans values et la passer Ã  la

    // methode signInWithEmailAndPassword

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (credentials) => {
        console.log(credentials);

        console.log(state);
        await setDoc(doc(db, "users", credentials.user.uid), 
          {
            name: values.email,
            prenom: values.prenom,
          }
        ).then((doc) =>
          console.log(doc)
        );

        //.catch(() => )

        message.success("Vous êtes bien inscrit");

        // props.setActiveComponent(<Dashboard />);
      })

      .catch((err) => {
        message.error(err.message);
      });
  };

  const onFinishFailed = (values) => {};

  const label = [
    {
      name: "nom",
      title: "Nom",
      action: (e) => {
        setState({ ...state, nom: e.target.value });
      },
    },
    {
      name: "prenom",
      title: "Prenom",
      action: (e) => {
        setState({ ...state, prenom: e.target.value });
      },
    },
    {
      name: "email",
      title: "Email",
      action: (e) => {
        setState({ ...state, email: e.target.value });
      },
    },
  ];

  const createMenuItem = (label) => {
    return (
      <Form.Item
        label={label.title}
        name={label.name}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    );
  };

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
      {label.map((label) => createMenuItem(label))}
      <Form.Item
        label={"Password"}
        name={"password"}
        rules={[
          {
            required: true,
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
          Inscription
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Inscription;
