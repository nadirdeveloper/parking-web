import React, { Component } from 'react'
import styles from './AllBookings.module.css'
import { Typography, Button, Modal, Input, notification, Select } from 'antd';
import { UserAddOutlined, UserOutlined} from '@ant-design/icons';
import BookingsTable from './BookingsTable';
import { userActions } from '../../../Redux/Actions';
import { connect } from 'react-redux';
import { userService } from '../../../Services';
const { Title } = Typography;
const { Option } = Select;
class AllBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            areaName: "",
            parkingSpace: 1
        }
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAllBookings());
    }
    handleOk = () => {
        const { areaName,parkingSpace } = this.state;
        const data = {
            areaName,parkingSpace
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
        const { visible, confirmLoading, areaName,parkingSpace } = this.state;
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>ALL BOOKINGS</Title>
                <div className={styles.usersActions}>
                    {/* <Button
                        type="primary"
                        onClick={() => this.setState({ visible: true })}
                        icon={<UserAddOutlined />}
                        size="small"
                        style={{ width: 100, height: 40 }}
                    >
                        Add Area
                    </Button> */}
                </div>
                {/* <Modal
                    title="ADD AREA"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="CREATE"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input type="text" size="large" onChange={(e) => this.setState({ areaName: e.target.value })} value={areaName} placeholder="Area Name" prefix={<UserOutlined />} />
                    <br /><br />

                    <Select defaultValue={parkingSpace} style={{ width: 120 }} onChange={(value) => this.setState({ parkingSpace: value })}>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                        <Option value={5}>5</Option>
                    </Select>
                </Modal> */}
                <BookingsTable loading={this.props.loading} data={this.props.data} />
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        loading: state.bookings.loading,
        data: state.bookings.data
    }
};

export default connect(mapStateToProps)(AllBookings)