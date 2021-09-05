import React from 'react'
import availableImg from '../../../assets/images/parking-available.png';
import unavailableImg from '../../../assets/images/parking-unavailable.png';
import normalImg from '../../../assets/images/parking-normal.png';
import { Button } from 'antd';
export default function SlotBtn({ setSlotId, data, selectedSlot, styles }) {
    return (
        <div className={styles.parkingSlot} onClick={() => setSlotId(data)}>
            <img alt="parkingImg" height="80" src={(selectedSlot?.id === data.id) ? (data.isAvailable ? availableImg : unavailableImg) : normalImg} />
            {data.name}
            <Button style={(selectedSlot?.id === data.id) ? (data.isAvailable ? { backgroundColor: 'green' } : { backgroundColor: 'red' }) : {}} type="primary">{(selectedSlot?.id === data.id) ? (data.isAvailable ? "SELECTED" : "UNAVAILABLE") : "SELECT"}</Button>
        </div>
    )
}
