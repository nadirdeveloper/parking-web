import React from 'react'
import { Card } from 'antd'

export default function DashboardCard({ styles, data }) {
    return (
        <Card className={styles.cardContainer}>
            <div className={styles.cardLeftContainer}>
                {data.icon}
            </div>
            <div className={styles.cardRightContainer}>
                <h3>{data.title}</h3>
                <h2>{data.value}</h2>
            </div>
        </Card>
    )
}
