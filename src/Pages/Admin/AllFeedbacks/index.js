import React, { Component } from 'react'
import styles from './AllFeedbacks.module.css'
import { Typography, Button, Modal, Input, notification, Select } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import FeedbacksTable from './FeedbacksTable';
import { userActions } from '../../../Redux/Actions';
import { connect } from 'react-redux';
import { userService } from '../../../Services';
const { Title } = Typography;
const { Option } = Select;
class AllFeedbacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            replyText: "",
            selectedFeedback: ""
        }
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAllFeedbacks());
    }
    handleOk = () => {
        const { replyText, selectedFeedback } = this.state;
        const data = {
            feedbackReply: replyText, feedbackId: selectedFeedback
        }
        if(replyText === ""){
            return notification.open({ message: "Please Enter Something To Reply", type: "error" });
        }
        this.setState({ confirmLoading: true });
        userService.replyFeedback(data).then((response) => {
            this.setState({ confirmLoading: false, visible: false });
            this.props.dispatch(userActions.getAllFeedbacks());
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
        const { visible, confirmLoading, replyText } = this.state;
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>ALL FEEDBACKS</Title>
                <div className={styles.usersActions}>
                </div>
                <Modal
                    title="REPLY FEEDBACK"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="REPLY"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input.TextArea size="large" onChange={(e) => this.setState({ replyText: e.target.value })} value={replyText} placeholder="Area Name" prefix={<UserOutlined />} />
                    <br /><br />


                </Modal>
                <FeedbacksTable loading={this.props.loading} handleReply={(data) => this.setState({ replyText: data.reply == "false" ? "" : data.reply, selectedFeedback: data.id, visible: true })} data={this.props.data} />
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        loading: state.feedbacks.loading,
        data: state.feedbacks.data
    }
};

export default connect(mapStateToProps)(AllFeedbacks)