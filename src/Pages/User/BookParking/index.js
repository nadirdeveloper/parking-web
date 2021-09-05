import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../../Redux/Actions';
import { Button, Input, notification, Select, Spin, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import styles from './BookParking.module.css';
import AreaCard from './AreaCard';
import { userService } from '../../../Services';
import SlotBtn from './SlotBtn';
const { Title } = Typography;
const { Option } = Select;
class BookParking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAreaId: null,
            parkingSlots: [],
            parkingSlotsLoading: false,
            selectedDate: "",
            selectedStartTime: "Select",
            selectedEndTime: "Select",
            selectedSlot: null
        }
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAllAreas());
    }
    handleAreaId = (selectedAreaId) => {
        this.setState({ selectedAreaId });

    }

    handleCheckSlot = () => {
        const { selectedAreaId, selectedStartTime, selectedEndTime, selectedDate } = this.state;
        const data = {
            areaId: selectedAreaId, selectedStartTime, selectedEndTime, selectedDate
        }
        const currentTime = new Date().getTime();
        if (selectedDate === "" || selectedStartTime === "Select" || selectedEndTime === "Select") {
            return notification.open({ message: "Please Fill Out All Fields", type: 'error' })
        }
        if (new Date(`${selectedDate} ${selectedStartTime}`).getTime() <= currentTime) {
            return notification.open({ message: 'You can not select previous time', type: 'error' })
        }
        if (new Date(`${selectedDate} ${selectedEndTime}`).getTime() <= currentTime) {
            return notification.open({ message: 'You can not select previous time', type: 'error' })
        }
        if (new Date(`${selectedDate} ${selectedEndTime}`).getTime() <= new Date(`${selectedDate} ${selectedStartTime}`).getTime()) {
            return notification.open({ message: 'You can not select invalid time', type: 'error' })
        }
        this.setState({ parkingSlotsLoading: true, parkingSlots: [], selectedSlot: null })
        userService.getAreaSlots(data).then((data) => {
            this.setState({ parkingSlots: data, parkingSlotsLoading: false })
        }, (error) => {
            if (error) {
                this.setState({ parkingSlotsLoading: false })
                notification.open({ message: error.message, type: "error" })
            }
        })
    }

    handleParkingSlot = () => {
        const { selectedAreaId, selectedStartTime, selectedEndTime, selectedDate, selectedSlot } = this.state;
        const data = {
            areaId: selectedAreaId, parkingId: selectedSlot.id, selectedStartTime, selectedEndTime, selectedDate
        }
        userService.bookParkingSlot(data).then((data) => {
            notification.open({ message: data.message, type: "success" });
            this.setState({ areaId: null, parkingId: null, selectedStartTime: 'Select', selectedDate: '', selectedEndTime: 'Select' });
            this.props.history.push("/user/viewParkings");
        }, (error) => {
            if (error) {
                this.setState({ parkingSlotsLoading: false })
                notification.open({ message: error.message, type: "error" })
            }
        })

    }

    render() {
        const { selectedAreaId, selectedDate, selectedStartTime, selectedEndTime, parkingSlots, parkingSlotsLoading, selectedSlot } = this.state;
        const times = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
        return (
            <div>
                {
                    !selectedAreaId ? (
                        <>
                            <Title className={styles.mainHeading} level={2}>SELECT AREA</Title>
                            <div className={styles.areasGrid}>

                                {
                                    this.props.loading ? (<Spin size="large" />) : this.props?.areas?.map((data) => (
                                        <AreaCard styles={styles} handleAreaId={(id) => this.handleAreaId(id)} data={data} />
                                    ))
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            <Title className={styles.mainHeading} level={2}>SELECT SLOT</Title>
                            <Title className={styles.subHeading} level={5}>SELECT DATE</Title>
                            <Input type="date" size="large" onChange={(e) => { this.setState({ selectedDate: e.target.value, parkingSlots: [], selectedSlot: null }) }} value={selectedDate} placeholder="Select Date" prefix={<CalendarOutlined />} />
                            <br /><br />
                            <Title className={styles.subHeading} level={5}>SELECT START TIME</Title>
                            <Select defaultValue={selectedStartTime} style={{ width: "100%" }} onChange={(value) => this.setState({ selectedStartTime: value, parkingSlots: [], selectedSlot: null })}>
                                {
                                    times.map((time) => (
                                        <Option key={time} value={time}>{time}</Option>
                                    ))
                                }
                            </Select>
                            <Title className={styles.subHeading} level={5}>SELECT END TIME</Title>
                            <Select defaultValue={selectedEndTime} style={{ width: "100%" }} onChange={(value) => this.setState({ selectedEndTime: value, parkingSlots: [], selectedSlot: null })}>
                                {
                                    times.map((time) => (
                                        <Option key={time} value={time}>{time}</Option>
                                    ))
                                }
                            </Select>
                            <div className={styles.checkSlot}>
                                <Button onClick={() => this.handleCheckSlot()} type="primary">CHECK SLOTS</Button>
                            </div>
                        </>
                    )
                }
                <br /><br />
                <div className={styles.slotsGrid}>
                    {
                        parkingSlotsLoading ? (<Spin size="large" />) : parkingSlots.map((slots) => {
                            return (
                                <SlotBtn data={slots} styles={styles} selectedSlot={selectedSlot} setSlotId={(id) => this.setState({ selectedSlot: id })} />
                            )
                        })
                    }
                </div>

                {
                    selectedSlot && (
                        <div className={styles.bookSlot}>
                            <Button size="large" disabled={selectedSlot ? !selectedSlot.isAvailable : selectedSlot.isAvailable} onClick={() => this.handleParkingSlot()} type="dashed" >Book Slot</Button>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.areas.loading,
        areas: state.areas.data
    }
};

export default connect(mapStateToProps)(BookParking)