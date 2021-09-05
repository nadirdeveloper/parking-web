import React from 'react'
import DashboardCard from '../../../Components/DashboardCard';
import { UserOutlined, CloseCircleOutlined, InfoCircleOutlined, ScheduleOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons'
export default function AllCards({ data, styles }) {
    const allCards = [
        {
            title: "TOTAL USERS",
            icon: <UserOutlined className={styles.cardIcon} />,
            value: data?.usersCount
        },
        {
            title: "TOTAL AREAS",
            icon: <EnvironmentOutlined className={styles.cardIcon} />,
            value: data?.areasCount
        },
        {
            title: "TOTAL BOOKINGS",
            icon: <ScheduleOutlined className={styles.cardIcon} />,
            value: data?.bookingCount
        },
        {
            title: "TOTAL CANCELATIONS",
            icon: <CloseCircleOutlined className={styles.cardIcon} />,
            value: data?.cancelledBookingCount
        },
        {
            title: "TOTAL PARKING SLOTS",
            icon: <CalendarOutlined className={styles.cardIcon} />,
            value:  data?.totalParkingSlots
        },
        {
            title: "TOTAL FEEDBACKS",
            icon: <InfoCircleOutlined className={styles.cardIcon} />,
            value: data?.totalFeedbacks
        },

    ]
    return (
        <div className={styles.cardGrid}>
            {
                allCards.map((data) => (
                    <DashboardCard styles={styles} data={data} />
                ))
            }
        </div>
    )
}
