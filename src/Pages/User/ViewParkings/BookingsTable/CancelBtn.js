import { Button, notification } from 'antd';
import React, { useState } from 'react'
import { userService } from '../../../../Services';

export default function CancelBtn({ record,getAllBookings }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        userService.cancelBooking(record.id).then((response) => {
            getAllBookings();
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
        <Button loading={loading} onClick={() => handleDelete()} size="small" style={{ width: 90,backgroundColor:"red", color:"#fff" }}>
            Cancel
        </Button>
    )
}
