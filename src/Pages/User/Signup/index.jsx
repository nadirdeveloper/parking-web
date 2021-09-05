import React, { Component } from 'react'
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import logo from '../../../assets/images/logo.png';
import logoBlack from '../../../assets/images/logo-black.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../../Redux/Actions'
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleSignup = ({ dob,email,fullName, password,phoneNo }) => {
        const { dispatch } = this.props;
        const data = {
            email,
            fullName,
            password,
            phoneNumber: phoneNo,
            dob
        }
        if (email && password && phoneNo && fullName && dob) {
            dispatch(userActions.signup(data, this.props.history));
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
                                remember: false,
                            }}
                            onFinish={(data) => this.handleSignup(data)}
                        >
                            <div className="login-logo-container">
                                <img src={logoBlack} alt="logo" height="50" />
                            </div>
                            <Title level={5}>FullName</Title>
                            <Form.Item
                                name="fullName"
                                className="sigup-inputfield"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
                            </Form.Item>
                            <Title level={5}>Email</Title>
                            <Form.Item
                                name="email"
                                className="signup-inputfield"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid Email'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Title level={5}>Password</Title>
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
                            <Title level={5}>Date Of Birth</Title>
                            <Form.Item
                                name="dob"
                                className="login-inputfield"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Date Of Birth!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="date"
                                    placeholder="Date Of Birth"
                                />
                            </Form.Item>
                            <Title level={5}>Phone No</Title>
                            <Form.Item
                                name="phoneNo"
                                className="login-inputfield"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Phone Number!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="number"
                                    placeholder="Phone No."
                                />
                            </Form.Item>
                            <Form.Item>
                                <div className="login-form-btn-cont">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Signup
                                    </Button>
                                </div>
                                Or <Link to="/user/login">already have an account!</Link>
                            </Form.Item>
                        </Form></div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Parking ©2021 Created by Nadir Ali</Footer>
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
export default connect(mapStateToProps)(Signup);;