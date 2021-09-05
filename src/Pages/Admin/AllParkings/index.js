import React, { Component } from 'react'
import styles from './AllParkings.module.css'
import { Typography, Button, Modal, Input, notification, Select } from 'antd';
import { UserAddOutlined, UserOutlined} from '@ant-design/icons';
import ParkingsTable from './ParkingsTable';
import { userActions } from '../../../Redux/Actions';
import { connect } from 'react-redux';
import { userService } from '../../../Services';
const { Title } = Typography;
const { Option } = Select;
class AllParkings extends Component {
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
        this.props.dispatch(userActions.getAllParkings());
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
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>ALL PARKING SLOTS</Title>
                <div className={styles.usersActions}>
                </div>
                <ParkingsTable loading={this.props.loading} data={this.props.data} />
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        loading: state.parkings.loading,
        data: state.parkings.data
    }
};

export default connect(mapStateToProps)(AllParkings)