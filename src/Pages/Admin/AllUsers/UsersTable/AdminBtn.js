import { Button, notification } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../Redux/Actions';
import { userService } from '../../../../Services';

export default function AdminBtn({ record, text }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleRoleChange = () => {
        setLoading(true);
        userService.changeUserRole(record.userId, record.role === "admin" ? "user" : "admin").then((response) => {
            dispatch(userActions.getAllUsers());
            setLoading(false);
            notification.open({ message: response.message, type: "success" });
        }, (error) => {
            if (error) {
                setLoading(false);
                notification.open({ message: error.message, type: "error" });
            }
        })
    }
    return (
        <Button loading={loading} onClick={() => handleRoleChange()} size="small" style={{ width: 90 }}>
            {text}
        </Button>
    )
}
