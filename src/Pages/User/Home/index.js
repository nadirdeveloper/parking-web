import { Button ,Typography} from 'antd';
import React, { Component } from 'react';
const {Title} = Typography
export default class Home extends Component {
    render() {
        return (
            <div style={{
                width:"100%",
                minHeight:"70vh",
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column'
            }}>
                <Title level={2}>BOOK YOUR PARKING AND SAVE YOUR TIME</Title>
                <Button onClick={()=>this.props.history.push("/user/bookParking")} type="primary">Start Booking</Button>
            </div>
        )
    }
}
