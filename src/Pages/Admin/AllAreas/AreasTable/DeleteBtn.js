import { Button, notification } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../Redux/Actions';
import { userService } from '../../../../Services';

export default function DeleteBtn({ record }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        setLoading(true);
        userService.deleteArea(record.id).then((response) => {
            dispatch(userActions.getAllAreas());
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
        <Button loading={loading} onClick={() => handleDelete()} size="small" style={{ width: 90 }}>
            DELETE
        </Button>
    )
}
