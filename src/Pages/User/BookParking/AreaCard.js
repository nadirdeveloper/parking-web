import React from 'react'
import { Card } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
export default function AreaCard({ styles, data, handleAreaId }) {
    return (
        <Card onClick={() => handleAreaId(data.id)} className={styles.cardContainer}>
            <div className={styles.cardLeftContainer}>
                <EnvironmentOutlined className={styles.cardIcon} />
            </div>
            <div className={styles.cardRightContainer}>
                <h3>{data.name}</h3>
            </div>
        </Card>
    )
}
