import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import logo from '../../../assets/images/logo.png';
import logoBlack from '../../../assets/images/logo-black.png';
// import styles from './Login.module.css';
import { connect } from 'react-redux';
import { userActions } from '../../../Redux/Actions'
const { Header, Content, Footer } = Layout;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleLogin = ({ email, password }) => {
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }
    render() {
        return (
            <Layout className="login-layout">
                <Header className="header-background" >
                    <div className="logo">
                        <img src={logo} alt="logo" height="50" />
                    </div>
                </Header>
                <Content style={{ padding: '0 50px', }}>
                    <div className="site-layout-content">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={(data) => this.handleLogin(data)}
                        >
                            <div className="login-logo-container">
                                <img src={logoBlack} alt="logo" height="50" />
                            </div>
                            <Form.Item
                                name="email"
                                className="login-inputfield"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                className="login-inputfield"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <span className="login-form-forgot" href="#">
                                    Forgot password
                                </span>
                            </Form.Item>

                            <Form.Item>
                                <div className="login-form-btn-cont">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </div>
                                {/* Or <a href="">register now!</a> */}
                            </Form.Item>
                        </Form></div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Customadeblinds ©2021 Created by Makaan Inc</Footer>
            </Layout>
        )
    }
}
const mapStateToProps = (state) => {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
export default connect(mapStateToProps)(Login);;