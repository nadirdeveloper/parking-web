import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import DeleteBtn from './DeleteBtn';
import CancelBtn from './CancelBtn';

class BookingsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
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
        render: (text) => text.name,
      },
      {
        title: 'Parking Name',
        dataIndex: 'parkingId',
        key: 'parkingId',
        width: '10%',
        render: (text) => text.name
      },
      {
        title: 'Start At',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '10%',
        render: (text) => new Date(text).toUTCString(),
      },
      {
        title: 'End At',
        dataIndex: 'endTime',
        key: 'endTime',
        width: '10%',
        render: (text) => new Date(text).toUTCString(),
      },
      {
        title: 'Booked',
        dataIndex: 'isBooking',
        key: 'isBooking',
        width: '10%',
        render: (text,record) => (
          <p>{ (new Date().getTime() >= record.endTime) ? "Ended" : text ? "Booked" : "Cancelled"}</p>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <Space size="middle">
            <DeleteBtn record={record} />
            <CancelBtn record={record} />
          </Space>
        ),
      },
    ];
    return <Table columns={columns} loading={this.props.loading} dataSource={this.props.data || []} />;
  }
}

export default BookingsTable;