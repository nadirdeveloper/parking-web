import React, { Component } from 'react'
import { notification, Typography } from 'antd';
import styles from './ViewParkings.module.css';
import BookingsTable from './BookingsTable'
import { userService } from '../../../Services';
const { Title } = Typography;
export default class ViewParkings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBookings: [],
            allBookingsLoading: true
        }
    }
    componentDidMount() {
        this.getAllBookings();
    }
    getAllBookings = () => {
        userService.getUserBookings().then((data) => {
                this.setState({ allBookings: data.userBookings, allBookingsLoading: false })
        }).catch((error) => {
            if (error) {
                notification.open({ message: error.message, type: 'error', allBookingsLoading: false })
            }
        })
    }
    render() {
        const {allBookings,allBookingsLoading} = this.state;
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>YOUR BOOKINGS</Title>
                <BookingsTable getAllBookings={this.getAllBookings} data={allBookings} loading={allBookingsLoading} />
            </div>
        )
    }
}
