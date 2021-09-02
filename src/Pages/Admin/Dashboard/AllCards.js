import React from 'react'
import DashboardCard from '../../../Components/DashboardCard';
import { UserOutlined, CloseCircleOutlined, InfoCircleOutlined, ScheduleOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons'
export default function AllCards({ data, styles }) {
    const allCards = [
        {
            title: "TOTAL USERS",
            icon: <UserOutlined className={styles.cardIcon} />,
            value: 400
        },
        {
            title: "TOTAL AREAS",
            icon: <EnvironmentOutlined className={styles.cardIcon} />,
            value: 400
        },
        {
            title: "TOTAL BOOKINGS",
            icon: <ScheduleOutlined className={styles.cardIcon} />,
            value: 400
        },
        {
            title: "TOTAL CANCELATIONS",
            icon: <CloseCircleOutlined className={styles.cardIcon} />,
            value: 400
        },
        {
            title: "TOTAL AVAILABLE BOOKINGS",
            icon: <CalendarOutlined className={styles.cardIcon} />,
            value: 400
        },
        {
            title: "TOTAL FEEDBACKS",
            icon: <InfoCircleOutlined className={styles.cardIcon} />,
            value: 400
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
