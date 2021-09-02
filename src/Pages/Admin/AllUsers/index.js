import React, { Component } from 'react'
import styles from './allUsers.module.css'
import { Typography, Button, Modal, Input, notification, Select } from 'antd';
import { UserAddOutlined, UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import UserTable from './UsersTable';
import { userActions } from '../../../Redux/Actions';
import { connect } from 'react-redux';
import { userService } from '../../../Services';
const { Title } = Typography;
const { Option } = Select;
class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            fullName: "",
            email: "",
            password: "",
            phoneNo: "",
            dob: "",
            role: "user"
        }
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAllUsers());
    }
    handleOk = () => {
        const { fullName, email, password, phoneNo, dob, role } = this.state;
        const data = {
            fullName, email, password, phoneNo, dob, role
        }
        this.setState({ confirmLoading: true });
        userService.addUser(data).then((response) => {
            this.setState({ confirmLoading: false, visible: false });
            this.props.dispatch(userActions.getAllUsers());
            notification.open({ message: response.message, type: "success" });
        }, (error) => {
            if (error) {
                this.setState({ confirmLoading: false });
                notification.open({ message: error.message, type: "error" });
            }
        })
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        const { visible, confirmLoading, fullName, email, password, phoneNo, dob, role } = this.state;
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>ALL USERS</Title>
                <div className={styles.usersActions}>
                    <Button
                        type="primary"
                        onClick={() => this.setState({ visible: true })}
                        icon={<UserAddOutlined />}
                        size="small"
                        style={{ width: 100, height: 40 }}
                    >
                        Add User
                    </Button>
                </div>
                <Modal
                    title="ADD USER"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="CREATE"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input type="text" size="large" onChange={(e) => this.setState({ fullName: e.target.value })} value={fullName} placeholder="Full Name" prefix={<UserOutlined />} />
                    <br /><br />
                    <Input type="email" size="large" onChange={(e) => this.setState({ email: e.target.value })} value={email} placeholder="Email" prefix={<MailOutlined />} />
                    <br /><br />
                    <Input type="password" size="large" onChange={(e) => this.setState({ password: e.target.value })} value={password} placeholder="Password" prefix={<LockOutlined />} />
                    <br /><br />
                    <Input type="number" size="large" onChange={(e) => this.setState({ phoneNo: e.target.value })} value={phoneNo} placeholder="Phone No" prefix={<PhoneOutlined />} />
                    <br /><br />
                    <Input type="date" size="large" onChange={(e) => this.setState({ dob: e.target.value })} value={dob} placeholder="Date Of Birth" prefix={<CalendarOutlined />} />
                    <br /><br />

                    <Select defaultValue={role} style={{ width: 120 }} onChange={(value) => this.setState({ role: value })}>
                        <Option value="user">USER</Option>
                        <Option value="admin">ADMIN</Option>
                    </Select>
                </Modal>
                <UserTable loading={this.props.loading} data={this.props.data} />
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.users.loading,
        data: state.users.data
    }
};

export default connect(mapStateToProps)(AllUsers)