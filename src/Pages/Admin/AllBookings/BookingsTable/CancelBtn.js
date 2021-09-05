import { Button, notification } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../Redux/Actions';
import { userService } from '../../../../Services';

export default function CancelBtn({ record }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        setLoading(true);
        userService.cancelAdminBooking(record.id).then((response) => {
            dispatch(userActions.getAllBookings());
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
        <Button loading={loading} disabled={!record.isBooking || new Date().getTime() >= record.endTime } onClick={() => handleDelete()} size="small" style={{ width: 90 }}>
            Cancel
        </Button>
    )
}
