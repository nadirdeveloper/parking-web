import React from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import CancelBtn from './CancelBtn';
import printImage from '../../../../assets/images/logo.png';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

class AreasTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      selectedRecord: {},
      visible: false
    }
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };



  render() {
    const columns = [
      {
        title: 'Booking ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: 'Area Name',
        dataIndex: 'areaId',
        key: 'areaId',
        width: '10%',
        render: (text) => {
          return text.name
        }
      },
      {
        title: 'Parking Slot',
        dataIndex: 'parkingId',
        key: 'parkingId',
        width: '10%',
        render: (text) => {
          return text.name
        }
      },
      {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '10%',
        render: (text) => {
          return new Date(text).toUTCString()
        }
      },
      {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
        width: '10%',
        render: (text) => {
          return new Date(text).toUTCString()
        }
      },
      {
        title: 'Booked At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        render: (text) => {
          return new Date(text).toUTCString()
        }
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <Space size="middle">
            {(new Date().getTime() >= record.endTime) ? "Ended" : record.isBooking ? <CancelBtn getAllBookings={this.props.getAllBookings} record={record} /> : "Cancelled"}
            <Button onClick={() => this.setState({ selectedRecord: record, visible: true })}>Print</Button>
          </Space>
        ),
      },
    ];
    return (
      <>
        <Table columns={columns} loading={this.props.loading} dataSource={this.props.data || []} />
        <Modal
          ref={el => (this.componentRef = el)}
          title="Print Booking"
          width="100%"
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
        >
          
          <div style={{textAlign:'center',marginTop:"10px"}} ref={el => (this.componentRef = el)}>
            <img src={printImage} alt="imagetag" />
                <table style={{width:'100%',marginTop:"30px",marginBottom:"30px"}} border="1" >
                  <tbody>
                    <tr >
                      <td>Booking ID</td>
                      <td>Area Name</td>
                      <td>Parking Slot</td>
                      <td>Start Time</td>
                      <td>End Time</td>
                      <td>Created At</td>
                      <td>Status</td>
                    </tr>
                    <tr >
                      <td>{this.state.selectedRecord?.id}</td>
                      <td>{this.state.selectedRecord?.areaId?.name}</td>
                      <td>{this.state.selectedRecord?.parkingId?.name}</td>
                      <td>{new Date(this.state.selectedRecord?.startTime).toUTCString()}</td>
                      <td>{new Date(this.state.selectedRecord?.endTime).toUTCString()}</td>
                      <td>{this.state.selectedRecord?.createdAt}</td>
                      <td>{(new Date().getTime() >= this.state.selectedRecord?.endTime) ? "Ended" : this.state.selectedRecord?.isBooking ? "Booked" : "Cancelled"}</td>
                    </tr>
                  </tbody>
                </table>
                <p><b>Note:</b> Please Be On Time and Drive Safe</p>
          </div>
          <ReactToPrint content={() => this.componentRef}>
            <PrintContextConsumer>
              {({ handlePrint }) => (
                <div style={{ textAlign: 'center',marginBottom:"10px" }}>
                  <Button type="primary" onClick={handlePrint}>Print this out!</Button>
                </div>
              )}
            </PrintContextConsumer>
          </ReactToPrint>
        </Modal>
      </>);
  }
}

export default AreasTable;