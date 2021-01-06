import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
} from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from 'react';


const Login = () => {
    let history = useHistory()
    let params = new URL(document.location.href).searchParams
    const appid = params.get('appid')
    const r = params.get('r')
    useEffect(() => {
        if (appid == null) {
            message.error('缺少appid')
        }
        if (r == null) {
            message.error('缺少r')
        }
    }, [])

    const onFinish = ({ username, password }: { username: string, password: string }) => {
        let data = new FormData()
        data.append('name', username)
        data.append('password', password)
        data.append('appid', appid || '')
        axios({
            method: 'post',
            url: '/tasks/loginuser',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res.data)
            if (res.data) {
                if (res.data.code !== 0) {
                    message.error(res.data.result)
                } else if (res.data.code === 0) {
                    document.location.href = `${r}?uid=${res.data.result}`
                }
            }
        })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入您的账号!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入您的密码!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="密码"
                />
            </Form.Item>

            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
            </a>
            </Form.Item> */}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登陆/注册
            </Button>
                <p style={{ color: 'red' }}>请牢记账号密码，新账号将自动注册并登陆!</p>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    )
}

export default Login