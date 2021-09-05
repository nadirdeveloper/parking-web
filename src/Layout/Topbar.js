import React from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import logo from '../assets/images/logo1.png'
import avatarImage from '../assets/images/avatar.jpg'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../Redux/Actions'
const { Header, Content } = Layout;
class Topbar extends React.Component {
    state = {
    };

    getSelectedKey() {
        if (window.location.pathname === "/user/home") {
            return '1'
        } else if (window.location.pathname === "/user/bookParking") {
            return '2'
        } else if (window.location.pathname === "/user/viewParkings") {
            return '3'
        } else if (window.location.pathname === "/user/feedback") {
            return '4'
        } else {
            return '1'
        }
    }
    handleLogout = () => {
        this.props.dispatch(userActions.logout(this.props.history));
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item className="menu-nav-item" key="1"> <UserOutlined /> Profile</Menu.Item>
                <Menu.Divider />
                <Menu.Item className="menu-nav-item" key="2" onClick={() => this.handleLogout()} > <LogoutOutlined /> Logout</Menu.Item>
            </Menu>
        );

        return (
            <Layout>
                <Header style={{ width: '100%', display: "flex" }}>
                    <div style={{ textAlign: "center" }}>
                        <img src={logo} className="logo" alt="logo" height="45" />
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.getSelectedKey()]}
                        style={{ lineHeight: '64px', flex: 1, marginLeft: "10px" }}
                    >
                        <Menu.Item key="1">
                            <Link to="/user/home">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2"><Link to="/user/bookParking">Book Parking</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/user/viewParkings">View Bookings</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/user/feedback">Feedback</Link></Menu.Item>
                    </Menu>
                    <div className="right-nav-items">
                        <Dropdown overlayClassName="menu-nav-items" overlay={menu} trigger={['click']}>
                            <a href="#test" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <img src={avatarImage} alt="profileImg" className="nav-profile-img" height="50" />
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    className="site-layout-background-dashboard"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {this.props.children}
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>
                    Parking ©2021 Created by Nadir Ali
                </Footer> */}
            </Layout>
        );
    }
}

export default connect()(Topbar);