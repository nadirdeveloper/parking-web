import React, { Component } from 'react'
import styles from './Dashboard.module.css';
import { userActions } from '../../../Redux/Actions'
import { connect } from 'react-redux';
import { Spin, Typography } from 'antd';
import AllCards from './AllCards'
const {Title} = Typography
class Dashboard extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getDashboardData());
    }
    render() {
        return (
            <div>
                <Title className={styles.mainHeading} level={2}>DASHBOARD</Title>
                {
                    this.props.loading ? (
                        <div className={styles.spinContainer}>
                            <Spin />
                        </div>
                    ) : (
                            <AllCards styles={styles} data={{}} />
                    )
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.dashboard.loading,
        data: state.dashboard.data
    }
};
export default connect(mapStateToProps)(Dashboard);
