import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessKey = localStorage.getItem('accessKey');
    if (accessKey) {
      navigate('/', { replace: true }); // Redirect to home if already authenticated
    }
  }, [navigate]);

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:5000/v1/auth/login', values);
      const { tokens } = response.data;
      localStorage.setItem('accessKey', tokens.access.token);
      localStorage.setItem('refreshKey', tokens.refresh.token);
      console.log('Login successful:', response.data);
      navigate('/', { replace: true }); // Redirect to home after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: '50px 0' }}>
      <Card>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>Login</Typography.Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
