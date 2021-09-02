import React from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import {
    DashboardOutlined,
    CloseOutlined,
    MenuOutlined,
    UsergroupAddOutlined,
    ScheduleOutlined,
    LogoutOutlined,
    UserOutlined,
    InfoCircleOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
import logo from '../assets/images/logo1.png'
import logoMini from '../assets/images/logo-mini.png'
import avatarImage from '../assets/images/avatar.jpg'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const { Header, Sider, Content } = Layout;
class SideNav extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleLogout = () => {

    }
    getSelectedKey() {
        if (window.location.pathname === "/admin/dashboard") {
            return '1'
        } else if (window.location.pathname === "/admin/allUsers") {
            return '2'
        }else if (window.location.pathname === "/admin/allAreas") {
            return '3'
        }else if (window.location.pathname === "/admin/allBookings") {
            return '4'
        }else if (window.location.pathname === "/admin/allParkings") {
            return '5'
        }else if (window.location.pathname === "/admin/allFeedbacks") {
            return '6'
        } else {
            return '1'
        }
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item className="menu-nav-item" key="1"> <UserOutlined /> Profile</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => this.handleLogout()} className="menu-nav-item" key="2"> <LogoutOutlined /> Logout</Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="dashboard-logo">
                        <img src={!this.state.collapsed ? logo : logoMini} alt="logo" height="45" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.getSelectedKey()]}>
                        <Menu.Item key="1" icon={<DashboardOutlined />}>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
                            <Link to="/admin/allUsers"> All Users </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<EnvironmentOutlined />}>
                            <Link to="/admin/allAreas"> All Areas </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<ScheduleOutlined />}>
                            <Link to="/admin/allBookings"> All Bookings </Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<ClockCircleOutlined />}>
                            <Link to="/admin/allParkings"> All Parkings </Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<InfoCircleOutlined />}>
                            <Link to="/admin/allFeedbacks"> All Feed </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background-dashboard" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuOutlined : CloseOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
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
                </Layout>
            </Layout>
        );
    }
}
const mapStateToProps = () => {
    return {

    }
}
export default connect(mapStateToProps)(SideNav);