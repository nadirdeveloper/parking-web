import React, { Component } from 'react'
import styles from './allUsers.module.css'
import { Typography } from 'antd';
const { Title } = Typography
export default class AllUsers extends Component {
    render() {
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>All Users</Title>

            </div>
        )
    }
}
