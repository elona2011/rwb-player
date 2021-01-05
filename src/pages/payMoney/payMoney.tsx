import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MoneyCollectOutlined } from '@ant-design/icons';
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

    const onFinish = ({ username, password }: { username: string, password: string }) => {
        let params = new URL(document.location.href).searchParams
        const appid = params.get('appid')
        const r = params.get('r')
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
                if (res.data.code === 1) {
                    message.error('密码错误')
                } else if (res.data.code === 0) {
                    document.location.href = `http://proxy.xlcmll.top:36912${r}?uid=${res.data.result}`
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
                rules={[{ required: true, message: '请输入您的手机号!' }]}
            >
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="手机号" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入您的提现金额!' }]}
            >
                <Input
                    prefix={<MoneyCollectOutlined className="site-form-item-icon" />}
                    placeholder="提现金额"
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
                    提现
            </Button>
                <p style={{ color: 'red' }}>请开启：微信-我-支付-右上角三个点-允许通过手机号向我转账，否则无法到账！</p>
                <p style={{ color: 'red' }}>提现金额最低1元，24小时内到账!</p>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    )
}

export default Login