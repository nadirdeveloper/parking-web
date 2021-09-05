import React, { Component } from 'react'
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import logo from '../../../assets/images/logo.png';
import logoBlack from '../../../assets/images/logo-black.png';
import { connect } from 'react-redux';
import { userActions } from '../../../Redux/Actions'
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const {Title} = Typography;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleLogin = ({ email, password }) => {
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password, this.props.history));
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
                            onFinish={(data) => this.handleLogin(data)}
                        >
                            <div className="login-logo-container">
                                <img src={logoBlack} alt="logo" height="50" />
                            </div>
                            <Title level={5}>Email</Title>
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
                            <Form.Item>
                                <div className="login-form-btn-cont">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </div>
                                Or <Link to="/user/signup">create account!</Link>
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
export default connect(mapStateToProps)(Login);;