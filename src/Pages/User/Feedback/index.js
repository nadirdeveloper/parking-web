import React, { Component } from 'react'
import styles from './Feedbacks.module.css';
import { Input, Typography, Modal, notification, Button } from 'antd';
import FeedbackTable from './FeedbackTable';
import { userService } from '../../../Services';
const { Title } = Typography;
const { TextArea } = Input;

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            allFeedbacks: [],
            allFeedbacksLoading: false,
            userName: '',
            userFeedback: ''
        }
    }
    componentDidMount() {
        this.getAllFeedbacks();
    }
    handleOk = () => {
        const { userName, userFeedback } = this.state;
        const data = {
            name: userName,
            feedback: userFeedback
        }
        this.setState({ confirmLoading: true });
        userService.saveUserFeedback(data).then((response) => {
            this.setState({ confirmLoading: false, visible: false });
            this.getAllFeedbacks();
            notification.open({ message: response.message, type: "success" });
        }, (error) => {
            if (error) {
                this.setState({ confirmLoading: false });
                notification.open({ message: error.message, type: "error" });
            }
        })
    }
    getAllFeedbacks = () => {
        userService.getUserFeedbacks().then((data) => {
            this.setState({ allFeedbacks: data.allUserFeedbacks })
        }).catch((err) => {
            if (err) {
                notification.open({ message: err.message, type: "error" });
            }
        })
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        const { visible, confirmLoading, allFeedbacks,allFeedbacksLoading,userName, userFeedback } = this.state;
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>GIVE US FEEDBACK</Title>
                <div style={{ textAlign: 'right', marginBottom: 10 }}>
                    <Button type="primary" onClick={() => this.setState({ visible: true })} >Add Feedback</Button>
                </div>
                <Modal
                    title="SEND FEEDBACK"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="Send"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.feedbackForm}>
                        <Title className={styles.subHeading} level={4}>Name</Title>
                        <Input style={{ width: "100%" }} value={userName} onChange={(e) => this.setState({ userName: e.target.value })} placeholder="Your Name" />
                        <br /><br />
                        <Title className={styles.subHeading} level={4}>Your Feedback</Title>
                        <TextArea style={{ width: "100%" }} value={userFeedback} onChange={(e) => this.setState({ userFeedback: e.target.value })} placeholder="Your Feedback" />
                    </div>
                </Modal>
                <FeedbackTable data={allFeedbacks} loading={allFeedbacksLoading} />
            </div>
        )
    }
}
