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

function getCookie(name: string) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return ''
}

const Login = () => {
    let history = useHistory()
    let [availableMoney, setAvailableMoney] = useState('0')
    useEffect(() => {
        axios({
            method: 'post',
            url: '/tasks/playermoney',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res.data)
            if (res.data) {
                if (res.data.code !== 0) {
                    message.error(res.data.result)
                } else if (res.data.code === 0) {
                    setAvailableMoney((res.data.result / 100).toFixed(2))
                }
            }
        })
    })

    const onFinish = ({ phone, cash }: { phone: string, cash: string }) => {
        let data = new FormData()
        data.append('phone', phone)
        data.append('cash', Math.floor(parseFloat(cash) * 100) + '')
        axios({
            method: 'post',
            url: '/tasks/moneypay',
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
                    message.success('申请成功，24小时内到账')
                    setAvailableMoney((res.data.result / 100).toFixed(2))
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
                name="money"
                label="可提现金额"
            >
                <span>{availableMoney}元</span>
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[{ required: true, message: '请输入您的手机号!' }]}
            >
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="手机号" />
            </Form.Item>
            <Form.Item
                name="cash"
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
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    )
}

export default Login