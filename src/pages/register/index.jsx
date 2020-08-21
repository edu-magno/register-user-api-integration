import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import styled from "styled-components";
import Password from 'antd/lib/input/Password';

// const defaultValues = {
//   name: "",
//   username: "",
//   email: "",
//   password: "",
//   confirm: ""
// }

const UserRegister = () => {

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = async values => {

    console.log('Success:', values);

    const response = await axios.post('https://ka-users-api.herokuapp.com/users', {
      "headers": { 'content-type': 'application/json' },
      "user": {
        "name": values.name,
        "user": values.username,
        "email": values.email,
        "password": values.password,
        "password_confirmation": values.confirm
      }
    }).catch((err) => console.log(err));
  };

  return (
    <Form  {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <NewInput />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <NewInput />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <NewInput />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        {/* <Input.Password /> */}
        <NewPass />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        {/* <Input.Password /> */}
        <NewPass />
      </Form.Item>

      <NewButton type="primary" htmlType="submit">Register</NewButton>
    </Form>
  )
}

export default UserRegister;

const NewButton = styled(Button)`
  background-color: #2794F0; 
`;

const NewInput = styled(Input)`
  background-color: #1B1D1E;
  color: whitesmoke;
`;

const newFormItem = styled(Form.Item)`
  span, p {
    color: whitesmoke;
  }
  
`;

const NewPass = styled(Input.Password)`
  background-color: #1B1D1E;
  color: whitesmoke;

  input {
    background-color: #1B1D1E;
    color: whitesmoke;
  }
`;