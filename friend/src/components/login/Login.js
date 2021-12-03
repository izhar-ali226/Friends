
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import './login.css'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Login() {

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const [password, setPassword] = useState("");
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }
  const submitHandler = (e) => {
    // e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home")
        // Signed in
        const user = userCredential.user
        console.log(user, 'signed in')
        // history.push('/Teams')
      })
      .catch((error) => {
        // const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }
  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

      }
    });
  }

  return (
    <div className="login">
      <Form

        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}

        onFinish={submitHandler}
      >
        <h1 className="heading">Login</h1>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input onChange={emailChangeHandler}
            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
          <Input onChange={passwordChangeHandler}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/signup" >Sign up</Link>
        </Form.Item>
      </Form>
    </div>
  )
};



export default Login
