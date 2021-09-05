import React, { Component } from 'react'
import styles from './AllAreas.module.css'
import { Typography, Button, Modal, Input, notification, Select } from 'antd';
import { UserAddOutlined, UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import AreasTable from './AreasTable';
import { userActions } from '../../../Redux/Actions';
import { connect } from 'react-redux';
import { userService } from '../../../Services';
const { Title } = Typography;
const { Option } = Select;
class AllAreas extends Component {
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
        this.props.dispatch(userActions.getAllAreas());
    }
    handleOk = () => {
        const { areaName, parkingSpace } = this.state;
        const data = {
            areaName, parkingSpace
        }
        if(areaName === ""){
            return notification.open({ message: "Please Enter An Area Name", type: "error" });
        }
        this.setState({ confirmLoading: true });
        userService.addArea(data).then((response) => {
            this.setState({ confirmLoading: false, visible: false, parkingSpace: 1, areaName: "" });
            this.props.dispatch(userActions.getAllAreas());
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
        const { visible, confirmLoading, areaName, parkingSpace } = this.state;
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>ALL AREAS</Title>
                <div className={styles.usersActions}>
                    <Button
                        type="primary"
                        onClick={() => this.setState({ visible: true })}
                        icon={<UserAddOutlined />}
                        size="small"
                        style={{ width: 100, height: 40 }}
                    >
                        Add Area
                    </Button>
                </div>
                <Modal
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
                </Modal>
                <AreasTable loading={this.props.loading} data={this.props.data} />
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        loading: state.areas.loading,
        data: state.areas.data
    }
};

export default connect(mapStateToProps)(AllAreas)