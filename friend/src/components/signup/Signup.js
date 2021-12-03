import React, { useState } from 'react';
import "./signup.css"
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db, collection, addDoc } from '../firebase';



const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user, 'created')
        // history.push('/Teams')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
      })
      const collectionRef= collection(db, "Contact Info");
      const payload={name:name, email:email, password: password};
     addDoc(collectionRef, payload)
 
  }


  return (
    <div className="signup">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
      >
        <h1 className="heading">Sign up</h1>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input value={name} onChange={(e) => { setName(e.target.value); }}
            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your Email',
            },
          ]}
        >
          <Input value={email} onChange={(e) => { setEmail(e.target.value); }}
            prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input value={password} onChange={(e) => { setPassword(e.target.value); }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Sign Up
          </Button>
          Or <Link to="/" >already have an account? Sign In</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
